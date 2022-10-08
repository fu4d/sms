=== RosarioSIS REST API ===
Contributors: rosariosis
Tags: school, sis, student, connect
Requires at least: 4.0
Tested up to: 5.3
Stable tag: 1.0.0
License: GPLv2 or later
License URI: http://www.gnu.org/licenses/gpl-2.0.html

Plugin helper to connect to the RosarioSIS (free Student Information System) REST API.

== Description ==

WordPress plugin helper to connect to the RosarioSIS REST API. Connect to RosarioSIS through the REST API to send / retrieve your students, or any data that fits in your SIS.
This plugin has got no interface. You will only get notified in case the RosarioSIS API is not correctly configured from the WordPress admin "Plugins" screen.
This plugin provides a simple tool for developers to use in their own plugin to connect to the RosarioSIS REST API.

== Installation ==

Installing "RosarioSIS REST API" can be done either by searching for "RosarioSIS REST API" via the "Plugins > Add New" screen in your WordPress dashboard, or by using the following steps:

1. Download the plugin via WordPress.org
2. Upload the ZIP file through the 'Plugins > Add New > Upload' screen in your WordPress dashboard
3. Activate the plugin through the 'Plugins' menu in WordPress

RosarioSIS configuration steps:

1. Install and activate the [REST API](https://gitlab.com/francoisjacquet/REST_API) plugin for RosarioSIS.
2. Copy the admin user API token: go to menu _School > Configuration > Plugins_. Click on the _Configuration_ link next to REST API. Copy the _User Token_ (see screenshot).

WordPress configuration steps:
1. Add the RosarioSIS URL and your admin user API token to the `wp-config.php` file. Here is an example:
```
define( 'ROSARIOSIS_REST_API_URL', 'https://my-rosariosis.com/' );
define( 'ROSARIOSIS_REST_API_USER_TOKEN', 'M1e57FZ69D0ophaizqTRsNB6lQ3d0EA6' );
```

== Frequently Asked Questions ==

= Does this plugin depend on any others? =

No, but it depends on a working instance of [RosarioSIS](https://www.rosariosis.org/), accessible from the network, plus its [REST API](https://gitlab.com/francoisjacquet/REST_API) plugin.


= Does this create new database tables? =

No. There are no new database tables with this plugin.


= Does this load additional JS or CSS files ? =

No. This plugin does not load additional CSS or JS files.


= What does this plugin do? =

This plugin is useless on its own. It should be combined with another plugin that actually interacts with the RosarioSIS REST API (agenda, contacts, third parties, expense, clients, products, etc.).


= How can I disable the request cache? =

GET requests can be cached if explicitely stated (see the controller PHP code). Call the page adding `&disable_cache=1` to the URL to disable cache.


== Changelog ==

= 1.0.0 =
* 2020-02-22
* Initial release
