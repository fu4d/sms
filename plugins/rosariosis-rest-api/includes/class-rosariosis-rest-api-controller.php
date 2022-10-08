<?php
/**
 * RosarioSIS REST API Controller
 * Where we really
 * - Load the API.
 *
 * @package RosarioSIS REST API
 */

defined( 'ABSPATH' ) || exit;

/**
 * RosarioSIS REST API Controller class
 */
class RosarioSIS_REST_API_Controller extends RosarioSIS_REST_API {

	/**
	 * The single instance of RosarioSIS_REST_API_Controller.
	 *
	 * @var    object
	 * @access private
	 * @since  1.0.0
	 */
	private static $_instance = null;


	/**
	 * The request arguments.
	 *
	 * @var    array
	 * @access protected
	 * @since  1.0.0
	 */
	protected $request_args = array();


	/**
	 * Handle request response (error).
	 *
	 * @var    boolean
	 * @access protected
	 * @since  1.0.0
	 */
	public $handle_response = true;


	/**
	 * Errors.
	 *
	 * @var    array
	 * @access public
	 * @since  1.0.0
	 */
	public $errors = array();


	/**
	 * Body.
	 * Request response body.
	 *
	 * @var    string
	 * @access public
	 * @since  1.0.0
	 */
	public $body;


	/**
	 * Status.
	 * Request response status code.
	 *
	 * @var    int
	 * @access public
	 * @since  1.0.0
	 */
	public $status;


	/**
	 * Disable Request cache
	 *
	 * @var bool
	 */
	public $disable_cache = false;


	/**
	 * Constructor function.
	 *
	 * @access  public
	 * @since   1.0.0
	 *
	 * @param string $file    File pathname.
	 * @param string $version Version number.
	 * @return  void
	 */
	public function __construct( $file = '', $version = '1.0.0' ) {
		parent::__construct( $file, $version );

		$this->disable_cache = ! empty( $_GET['disable_cache'] );

		$this->cache  = false;

		add_action( 'current_screen', array( $this, 'plugins_screen_actions' ) );

		add_action( 'admin_notices', array( $this, 'admin_notices' ) );
	}


	/**
	 * Plugin screen actions:
	 * Test if connectivity to API is OK on admin pages: Plugins screen.
	 *
	 * @uses $this->check_connectivity()
	 */
	public function plugins_screen_actions() {

		$screen = get_current_screen();

		// Test if connectivity to API is OK on admin pages: Plugins screen.
		if ( 'plugins' === $screen->id ) {

			$this->check_connectivity();
		}
	}


	/**
	 * Main RosarioSIS_REST_API_Controller Instance
	 *
	 * Ensures only one instance of RosarioSIS_REST_API_Controller is loaded or can be loaded.
	 *
	 * @since 1.0.0
	 * @static
	 * @see RosarioSIS_REST_API()
	 *
	 * @param string $file    File pathname.
	 * @param string $version Version number.
	 * @return RosarioSIS_REST_API_Controller instance
	 */
	public static function instance( $file = '', $version = '1.0.0' ) {
		if ( is_null( self::$_instance ) ) {
			self::$_instance = new self( $file, $version );
		}
		return self::$_instance;
	}


	/**
	 * Check connectivity to RosarioSIS EventsManager module API
	 *
	 * @access  public
	 * @since   1.0.0
	 *
	 * @return bool
	 */
	public function check_connectivity() {

		static $connectivity_cache;

		if ( ! is_null( $connectivity_cache ) ) {

			return $connectivity_cache;
		}

		if ( ! defined( 'ROSARIOSIS_REST_API_URL' )
			|| ! defined( 'ROSARIOSIS_REST_API_USER_TOKEN' ) ) {

			$this->add_error( __( 'Please define the ROSARIOSIS_REST_API_URL & ROSARIOSIS_REST_API_USER_TOKEN constants in the wp-config.php file.', 'rosariosis-rest-api' ) );

			$connectivity_cache = false;

			return false;
		}

		if ( ! filter_var( ROSARIOSIS_REST_API_URL, FILTER_VALIDATE_URL ) ) {

			$this->add_error( __( 'Please enter a valid ROSARIOSIS_REST_API_URL in the wp-config.php file.', 'rosariosis-rest-api' ) );

			$connectivity_cache = false;

			return false;
		}

		$this->delete_cached_request( 'get', 'config?filter=title,eq,LOGIN' );
		$response = $this->get( 'config?filter=title,eq,LOGIN', false );

		if ( empty( $response ) || is_wp_error( $response ) ) {

			$this->add_error( __( 'Please enter a valid ROSARIOSIS_REST_API_URL and ROSARIOSIS_REST_API_USER_TOKEN in the wp-config.php file.', 'rosariosis-rest-api' ) );

			// Reintent live (no cache) as we just had an error!
			$this->delete_cached_request( 'get', 'config?filter=title,eq,LOGIN' );

			$connectivity_cache = false;

			return false;
		}

		if ( 200 === $this->status &&
			empty( $response->config_value ) ) {

			if ( ! empty( $response->error ) ) {
				$this->add_error( $response->error );
			} else {
				$this->add_error( __( 'Please enter a valid ROSARIOSIS_REST_API_URL and ROSARIOSIS_REST_API_USER_TOKEN in the wp-config.php file.', 'rosariosis-rest-api' ) );
			}

			// Reintent live (no cache) as we just had an error!
			$this->delete_cached_request( 'get', 'config?filter=title,eq,LOGIN' );

			$connectivity_cache = false;

			return false;
		}

		if ( $response->config_value ) {

			$this->add_error( __( 'Connection successful.', 'rosariosis-rest-api' ), 'success' );
		}

		$connectivity_cache = true;

		return true;
	}


	/**
	 * Get RosarioSIS API endpoint URL
	 *
	 * @return string
	 */
	public function endpoint() {

		if ( isset( $this->endpoint ) ) {

			return $this->endpoint;
		}

		$this->endpoint = rtrim( ROSARIOSIS_REST_API_URL, '/' ) . '/plugins/REST_API/api.php/';

		return $this->endpoint;
	}


	/**
	 * Get RosarioSIS API Authentication endpoint URL
	 *
	 * @return string
	 */
	public function auth_endpoint() {

		if ( isset( $this->auth_endpoint ) ) {

			return $this->auth_endpoint;
		}

		$this->auth_endpoint = rtrim( ROSARIOSIS_REST_API_URL, '/' ) . '/plugins/REST_API/auth.php';

		return $this->auth_endpoint;
	}


	/**
	 * Get RosarioSIS API Access token
	 * Note: cannot save access_token to transient, JWT error.
	 *
	 * @return string
	 */
	public function get_access_token() {

		if ( isset( $this->access_token ) ) {

			return $this->access_token;
		}

		$response = wp_remote_post(
			$this->auth_endpoint(),
			array( 'body' => array( 'usertoken' => ROSARIOSIS_REST_API_USER_TOKEN ) )
		);

		if ( empty( $response ) || is_wp_error( $response ) ) {

			return '';
		}

		$response_body = $this->handle_body( $response );

		if ( empty( $response_body->access_token ) ) {

			return '';
		}

		$this->access_token = $response_body->access_token;

		return $this->access_token;
	}


	/**
	 * Get RosarioSIS API action URL
	 *
	 * @uses $this->enpoint()
	 *
	 * @param string $action
	 *
	 * @return string
	 */
	public function get_action_url( $action ) {

		// Can omit 'records/'.
		if ( strpos( $action, 'records/' ) === false ) {
			$action = 'records/' . ltrim( $action, '/' );
		}

		return $this->endpoint() . $action;
	}


	/**
	 * Get DOLAPIKEY HTTP header.
	 *
	 * @return string
	 */
	public function auth_header() {

		if ( isset( $this->auth_header ) ) {

			return $this->auth_header;
		}

		$this->auth_header = array( 'X-Authorization' => 'Bearer ' . $this->get_access_token() );

		return $this->auth_header;
	}


	/**
	 * Get request arguments
	 *
	 * @param array $args Args to add to the request.
	 *
	 * @return array Request arguments.
	 */
	public function get_request_args( $args = array() ) {

		if ( empty( $this->request_args['headers'] ) ) {

			$this->request_args['headers'] = $this->auth_header();
		}

		return array_merge_recursive( $this->request_args, $args );
	}


	/**
	 * Get JSON data
	 * Encodes data to JSON if needed.
	 *
	 * @param array|string $data Data.
	 *
	 * @return mixed|string|void
	 */
	public function get_json_data( $data ) {

		return ( $this->is_json( $data ) ? $data : json_encode( $data ) );
	}


	/**
	 * Decode JSON data
	 * Decodes JSON data if needed.
	 *
	 * @param array|string $data JSON Data.
	 *
	 * @return mixed|string|void
	 */
	public function decode_json_data( $data ) {

		return ( $this->is_json( $data ) ? json_decode( $data ) : $data );
	}


	/**
	 * Is JSON?
	 *
	 * @param array|string $data Data.
	 *
	 * @return bool
	 */
	public function is_json( $data ) {
		if ( is_array( $data ) ) {

			return false;
		}

		@json_decode( $data );

		return ( json_last_error() === JSON_ERROR_NONE );
	}


	/**
	 * Reset object properties before new request.
	 */
	public function reset() {

		$this->errors = array();

		$this->request_args = array();

		$this->body = null;

		$this->status = null;
	}


	/**
	 * Remote Request
	 * Get response from cache if found (GET only).
	 *
	 * @uses wp_remote_get
	 * @uses wp_remote_post
	 * @uses wp_remote_request
	 * @uses get_cached_request
	 * @uses cache_request
	 *
	 * @param string $method Method: get|post|put|delete
	 * @param string $action API Action.
	 * @param array  $data   Data (for POST & DELETE)
	 *
	 * @return array|mixed|WP_Error
	 */
	function request( $method, $action, $data = array() ) {

		$this->reset();

		$cached_request = $this->get_cached_request( $method, $action, $data );

		if ( ! empty( $cached_request['response'] ) ) {

			$response = $cached_request['response'];
		} else {

			$args = array();

			if ( $data ) {

				$args['body'] = $data;
			}

			$action_url = $this->get_action_url( $action );

			if ( 'get' === $method ) {

				$response = wp_remote_get( $action_url, $this->get_request_args( $args ) );
			} elseif ( 'post' === $method ) {

				$response = wp_remote_post( $action_url, $this->get_request_args( $args ) );

			} elseif ( 'put' === $method ) {

				$args['method'] = 'PUT';

				$response = wp_remote_request( $action_url, $this->get_request_args( $args ) );
			} elseif ( 'delete' === $method ) {

				$args['method'] = 'DELETE';

				$response = wp_remote_request( $action_url, $this->get_request_args( $args ) );
			}
		}

		$this->cache_request( $method, $action, $response );

		return $response;
	}


	/**
	 * POST request
	 *
	 * @example /contacts/{id} get a contact.
	 *
	 * @param string $action API action.
	 *
	 * @return WP_Error|array The response or WP_Error on failure.
	 */
	public function get( $action, $cache = false ) {

		if ( $cache ) {
			$this->cache = $this->disable_cache;
		}

		$response = $this->request( 'get', $action );

		if ( $cache ) {
			$this->cache = false;
		}

		return $this->handle_response( $response );
	}


	/**
	 * POST request
	 *
	 * @example /contacts to create a contact.
	 *
	 * @param string $action API action.
	 * @param array  $data   Array or JSON data.
	 *
	 * @return WP_Error|array The response or WP_Error on failure.
	 */
	public function post( $action, $data = array() ) {

		$response = $this->request( 'post', $action, $data );

		return $this->handle_response( $response );
	}


	/**
	 * PUT request
	 *
	 * @example /contacts/{id} to delete a contact.
	 *
	 * @param string $action API action.
	 * @param array  $data   Array or JSON data.
	 *
	 * @return WP_Error|array The response or WP_Error on failure.
	 */
	public function put( $action, $data = array() ) {

		$response = $this->request( 'put', $action, $data );

		return $this->handle_response( $response );
	}


	/**
	 * DELETE request
	 *
	 * @example /contacts/{id} to delete a contact.
	 *
	 * @param string $action API action.
	 *
	 * @return WP_Error|array The response or WP_Error on failure.
	 */
	public function delete( $action ) {

		$response = $this->request( 'delete', $action );

		return $this->handle_response( $response );
	}


	/**
	 * Handle request response (or error)
	 * Set $this->handle_response to false if you do not want to the response to be handled here.
	 *
	 * @uses $this->handle_error()
	 *
	 * @param WP_Error|array $response Request response or WP_Error on failure.
	 *
	 * @return WP_Error|array|bool $response Request response or WP_Error on failure, when not handled or true / false when handled.
	 */
	public function handle_response( $response ) {

		if ( ! $this->handle_response ) {

			return $response;
		}

		if ( $this->handle_error( $response ) ) {

			return false;
		}

		if ( ! $this->handle_status( $response ) ) {

			return false;
		}

		// Return decoded response body.
		return $this->body;
	}


	/**
	 * Handle response error:
	 * get message and add to errors.
	 *
	 * @uses $this->add_error()
	 *
	 * @param WP_Error $wp_error
	 *
	 * @return boolean
	 */
	public function handle_error( $wp_error ) {

		$error_message = '';

		if ( is_wp_error( $wp_error ) ) {
			$error_message = $wp_error->get_error_message();

		} elseif ( empty( $wp_error ) ) {

			$error_message = __( 'Empty response. Unknown error.', 'rosariosis-rest-api' );
		}

		if ( ! empty( $error_message ) ) {

			$this->add_error( $error_message );

			return true;
		}

		return false;
	}


	/**
	 * Handle response status
	 * Sets $this->status
	 *
	 * @uses handle_body()
	 *
	 * @param array $response Request response.
	 *
	 * @return bool False if body has error, true if status code >= 200 or < 299, else false.
	 */
	public function handle_status( $response ) {

		$this->status = $response['response']['code'];

		if ( ! $this->handle_body( $response ) ) {

			return false;
		}

		if ( $this->status >= 200 &&
			$this->status < 299 ) {

			return true;
		}

		$message = $this->status . ' ' . $response['response']['message'];

		if ( defined( 'WP_DEBUG' ) && WP_DEBUG ) {

			$message .= ' &mdash; ' . $response['http_response']->get_response_object()->url;
		}

		$this->add_error( $message );

		return false;
	}


	/**
	 * Handle response body
	 * Sets $this->body with decoded JSON data.
	 *
	 * @param array $response Request response.
	 *
	 * @return bool False if body has error, else body.
	 */
	public function handle_body( $response ) {

		$this->body = $this->decode_json_data( $response['body'] );

		if ( ! empty( $this->body ) ) {

			if ( ! empty( $this->body->message ) ) {

				$message = $this->body->code . ' ' . $this->body->message;

				if ( defined( 'WP_DEBUG' ) && WP_DEBUG ) {

					$message .= ' &mdash; ' . $response['http_response']->get_response_object()->url;
				}

				$this->add_error( $message );

				return false;
			}
		}

		if ( isset( $this->body->records ) ) {
			$this->body = $this->body->records;

			if ( count( $this->body ) === 1 ) {
				$this->body = $this->body[0];
			}
		}

		return $this->body;
	}


	/**
	 * Add error message to errors
	 *
	 * @param string $error_message
	 * @param string $level   Level: info, success, error or warning.
	 *
	 * @return string Error message with plugin name prefixed.
	 */
	public function add_error( $message, $level = 'error', $plugin = 'this' ) {

		if ( 'this' === $plugin ) {

			$plugin = __( 'RosarioSIS REST API', 'rosariosis-rest-api' );
		}

		if ( $plugin ) {

			$message = $plugin . ' &mdash; ' . (string) $message;
		}

		$this->errors[] = array(
			'message' => $message,
			'level' => $level,
		);

		return $message;
	}

	/**
	 * Save errors to transient
	 * Pass errors from the save post action to the edit post screen redirection.
	 *
	 * @link https://www.sitepoint.com/displaying-errors-from-the-save_post-hook-in-wordpress/
	 *
	 * @param int $post_id
	 */
	public function save_errors_to_transient( $post_id = 0 ) {

		$post_id = $post_id ? $post_id : (int) $_GET['post'];

		$transient_name = 'rosariosis_rest_api_errors_' . $post_id;

		set_transient( $transient_name, serialize( $this->errors ), 45 );
	}


	/**
	 * Get errors from transient
	 * Get any error saved to transient for the current post ID.
	 * Delete transient immediately.
	 *
	 * @param int $post_id
	 *
	 * @return array|mixed
	 */
	public function get_errors_from_transient( $post_id = 0 ) {

		if ( ! $post_id && empty( $_GET['post'] ) ) {

			return array();
		}

		$post_id = $post_id ? $post_id : (int) $_GET['post'];

		$transient_name = 'rosariosis_rest_api_errors_' . $post_id;

		$transient = get_transient( $transient_name );

		// Delete transient.
		delete_transient( $transient_name );

		if ( empty( $transient ) ) {

			return array();
		}

		return unserialize( $transient );
	}


	/**
	 * Get last error and remove it from the errors array.
	 *
	 * @return array Empty array if no errors, else last error.
	 */
	public function last_error_unset() {

		if ( empty( $this->errors ) ) {

			return array();
		}

		return array_pop( $this->errors );
	}


	/**
	 * Admin notices action
	 *
	 * @access  public
	 * @since   1.0.0
	 *
	 * @uses notice_html()
	 */
	public function admin_notices() {

		$errors_from_transient = $this->get_errors_from_transient();

		if ( empty( $this->errors ) &&
			empty( $errors_from_transient ) ) {

			return;
		}

		foreach ( $this->errors as $error ) {

			$this->notice_html( $error['message'], $error['level'] );
		}

		foreach ( $errors_from_transient as $error ) {

			$this->notice_html( $error['message'], $error['level'] );
		}
	}


	/**
	 * Notice HTML output
	 *
	 * @param string $message Message.
	 * @param string $level   Level: info, success, error or warning.
	 */
	public function notice_html( $message, $level = '' ) {

		$level_class = '';

		if ( $level && 'notice' !== $level ) {
			$level_class = 'notice-' . $level;
		}
		?>
		<div class="notice <?php echo esc_attr( $level_class ); ?>">
			<p><?php echo wp_kses_post( $message ); ?></p>
		</div>
		<?php
	}


	/**
	 * Cache Request in transient (1 day)
	 * Bypass cache by setting $this->disable_cache to true.
	 *
	 * @param string $method
	 * @param string $action
	 * @param array  $response
	 * @param array  $data
	 *
	 * @return bool True if cached.
	 */
	public function cache_request( $method, $action, $response, $data = array() ) {

		// Do not cache POST, PUT and DELETE requests...
		if ( $this->cache && 'get' === $method ) {

			return false;
		}

		$cache = array(
			'method' => $method,
			'action' => $action,
			'data' => $data,
			'response' => $response,
		);

		$transient_name = 'rosariosis_rest_api_cache_' . $method . '_' . $action;

		return set_transient( $transient_name, $cache, 86400 );
	}


	/**
	 * Get cached Request in transient
	 * Bypass cache by setting $this->disable_cache to true.
	 *
	 * @param string $method
	 * @param string $action
	 * @param array  $data
	 *
	 * @return array|mixed Cached request or empty array.
	 */
	public function get_cached_request( $method, $action, $data = array() ) {

		// Do not cache POST, PUT and DELETE requests...
		if ( $this->cache && 'get' === $method ) {

			return array();
		}

		$transient_name = 'rosariosis_rest_api_cache_' . $method . '_' . $action;

		$cache = get_transient( $transient_name );

		if ( empty( $cache ) ) {

			return array();
		}

		if ( empty( $cache['data'] ) && empty( $data ) ) {

			return $cache;
		}

		if ( $cache['data'] !== $data ) {

			return array();
		}

		return $cache;
	}


	/**
	 * Delete cached Request in transient
	 *
	 * @param string $method
	 * @param string $action
	 *
	 * @return bool True if deleted.
	 */
	public function delete_cached_request( $method, $action ) {

		$transient_name = 'rosariosis_rest_api_cache_' . $method . '_' . $action;

		return delete_transient( $transient_name );
	}
}
