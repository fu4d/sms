<?php
/**
 * Menu.php file
 * Required
 * - Menu entries for the SMS module
 *
 * @package SMS module
 */

// Menu entries for the SMS module.
$menu['Automatic_Attendance']['admin'] = [ // Admin menu.
	'title' => dgettext( 'Automatic_Attendance', 'Auto Attendance' ),
	'default' => 'Automatic_Attendance/Configuration.php', // Program loaded by default when menu opened.
	'Automatic_Attendance/Configuration.php' => dgettext( 'Automatic_Attendance', 'Setup' ),
	1 => _( 'Setup' ),
	'Automatic_Attendance/Configuration.php' => _( 'Configuration' ),
];
