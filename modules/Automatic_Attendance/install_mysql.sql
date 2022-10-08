/**
 * Install MySQL
 * - Add program config options if any (to every schools)
 *
 * @package Automatic Attendance
 */

/**
 * config Table
 *
 * syear: school year (school may have various years in DB)
 * school_id: may exists various schools in DB
 * program: convention is plugin name, for ex.: 'email_smtp'
 * title: for ex.: 'AUTOMATIC_ATTENDANCE_[your_config]'
 * value: string
 */
--
-- Data for Name: config; Type: TABLE DATA; Schema: public; Owner: rosariosis
--

INSERT INTO config (school_id, title, config_value)
SELECT DISTINCT sch.id, 'AUTOMATIC_ATTENDANCE_CRON_DAY', CURRENT_DATE - INTERVAL 1 DAY
FROM schools sch
WHERE NOT EXISTS (SELECT title
    FROM config
    WHERE title='AUTOMATIC_ATTENDANCE_CRON_DAY');

INSERT INTO config (school_id, title, config_value)
SELECT DISTINCT sch.id, 'AUTOMATIC_ATTENDANCE_CRON_HOUR', '2359'
FROM schools sch
WHERE NOT EXISTS (SELECT title
    FROM config
    WHERE title='AUTOMATIC_ATTENDANCE_CRON_HOUR');


INSERT INTO profile_exceptions (profile_id, modname, can_use, can_edit)
SELECT 1, 'Automatic_Attendance/Configuration.php', 'Y', 'Y'
    WHERE NOT EXISTS (SELECT profile_id
    FROM profile_exceptions
    WHERE modname='Automatic_Attendance/Configuration.php'
    AND profile_id=1);

INSERT INTO profile_exceptions (profile_id, modname, can_use, can_edit)
SELECT 0, 'Automatic_Attendance/Configuration.php', 'Y', NULL
    WHERE NOT EXISTS (SELECT profile_id
    FROM profile_exceptions
    WHERE modname='Automatic_Attendance/Configuration.php'
    AND profile_id=0);

INSERT INTO profile_exceptions (profile_id, modname, can_use, can_edit)
SELECT 3, 'Automatic_Attendance/Configuration.php', 'Y', NULL
    WHERE NOT EXISTS (SELECT profile_id
    FROM profile_exceptions
    WHERE modname='Automatic_Attendance/Configuration.php'
    AND profile_id=3);