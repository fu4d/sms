<?php
/**
 * Functions
 *
 * @package Automatic Attendance
 */

if ( isset( $_REQUEST['modfunc'] )
	&& $_REQUEST['modfunc'] === 'automatic_attendance_update_daily_ajax' )
{
	require_once 'includes/common.fnc.php';

	$course_periods = empty( $_REQUEST['cp_id'] ) ? [] : $_REQUEST['cp_id'];

	$date = empty( $_REQUEST['date'] ) ? '' : $_REQUEST['date'];

	// Reset modfunc & cp_id & date in case Modules is dynamically reloaded based on $_SESSION request.
	RedirectURL( [ 'modfunc', 'cp_id', 'date' ] );

	AutomaticAttendanceUpdateDailyAJAX( $course_periods, $date );
}

// Add our AutomaticAttendanceCronDo() function to the Warehouse.php|header action.
add_action( 'Warehouse.php|header', 'AutomaticAttendanceCronDo' );

/**
 * Run daily CRON on page load.
 * Do my CRON logic.
 *
 * @uses Warehouse.php|header action hook
 */
function AutomaticAttendanceCronDo()
{
	$cron_day = Config( 'AUTOMATIC_ATTENDANCE_CRON_DAY' );

	if ( DBDate() <= $cron_day
		|| ! UserSchool() )
	{
		// CRON already ran today or not logged in.
		return false;
	}

	$cron_hour = Config( 'AUTOMATIC_ATTENDANCE_CRON_HOUR' );

	$yesterday = date( 'Y-m-d', time() - 60 * 60 * 24 );

	$run_time = date( 'Hi' );

	if ( $cron_day === $yesterday
		&& $run_time < $cron_hour )
	{
		// CRON already ran yesterday. Current time is before CRON hour.
		return false;
	}

	require_once 'includes/common.fnc.php';

	$cron_day_after = date( 'Y-m-d', strtotime( $cron_day ) + 60 * 60 * 24 );

	$return = AutomaticAttendanceDo( $cron_day_after );

	$cron_day_save = DBDate();

	if ( $run_time < $cron_hour )
	{
		// Save yesterday as we still need to run for today.
		$cron_day_save = $yesterday;
	}

	// Save CRON day.
	Config( 'AUTOMATIC_ATTENDANCE_CRON_DAY', $cron_day_save );

	return $return;
}
