<?php
/**
 * Plugin Name: RosarioSIS REST API
 * Version: 1.0.0
 * Plugin URI: https://gitlab.com/francoisjacquet/rosariosis-rest-api/
 * Description: Plugin helper to connect to the RosarioSIS (free Student Information System) REST API.
 * Author: RosarioSIS
 * Author URI: https://www.rosariosis.org/
 * Requires at least: 4.0
 * Tested up to: 5.3
 *
 * Text Domain: rosariosis-rest-api
 * Domain Path: /lang/
 *
 * @package RosarioSIS REST API
 * @author RosarioSIS
 * @since 1.0.0
 */

defined( 'ABSPATH' ) || exit;

// Load plugin class files.
require_once 'includes/class-rosariosis-rest-api.php';
// require_once 'includes/class-rosariosis-rest-api-settings.php';
require_once 'includes/class-rosariosis-rest-api-controller.php';

// Load plugin libraries.
// require_once 'includes/lib/class-rosariosis-rest-api-admin-api.php';
// require_once 'includes/lib/class-rosariosis-rest-api-post-type.php';
// require_once 'includes/lib/class-rosariosis-rest-api-taxonomy.php';

/**
 * Returns the main instance of RosarioSIS_REST_API to prevent the need to use globals.
 *
 * @since  1.0.0
 * @return object RosarioSIS_REST_API
 */
function rosariosis_rest_api() {
	$instance = RosarioSIS_REST_API_Controller::instance( __FILE__, '1.0.0' );

	/*if ( is_null( $instance->settings ) ) {
		$instance->settings = RosarioSIS_REST_API_Settings::instance( $instance );
	}*/

	return $instance;
}

rosariosis_rest_api();
