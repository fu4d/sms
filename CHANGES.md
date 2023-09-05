# CHANGES
## RosarioSIS Student Information System

Changes in 10.2.3
-----------------
- Remove dead link to centresis.org in index.php
- Fix MySQL error TEXT column used in key specification without a key length in Fields.fnc.php & DisciplineForm.php
- Add ROLLOVER_ID column to User() in User.fnc.php
- Get template from last school year (rollover ID) in Template.fnc.php

Changes in 10.2.2
-----------------
- Fix PHP fatal error undefined function StudentCanEnrollNextSchoolYear() in PrintStudentInfo.php
- Set school logo with to 120px in PrintStudentInfo.php

Changes in 10.2.1
-----------------
- SQL order by Marking Period Start Date in MarkingPeriods.php, ReportCards.fnc.php, Courses.php, Schedule.php, PrintSchedules.php, MassSchedule.php, MassDrops.php & Side.php
- Maintain current month on calendar change in Calendar.php
- Maintain Calendar when closing event popup in Calendar.php
- CSS FlatSIS smaller font size for Calendar Event title in stylesheet.css
- Fix SQL error mysqli_fetch_assoc(): Argument 1 must be of type mysqli_result, null given in database.inc.php & StudentsUsersInfo.fnc.php
- When -Edit- option selected, change the auto pull-down to text field in StudentsUsersInfo.fnc.php
- HTML remove bold for "Other students associated with this address/person" in Address.inc.php
- SQL order by FULL_NAME (Display Name config option) in PortalPollNotes.fnc.php, Widget.php, GetStaffList.fnc.php, GetStuList.fnc.php, Transcripts.fnc.php, Courses.php, MassRequests.php, ScheduleReport.php & Address.inc.php
- CSS fix Report Cards PDF columns size when long comments text in ReportCards.fnc.php & stylesheet_wkhtmltopdf.css
- CSS Add .grade-minmax-wrap,.grade-minmax-min,.grade-minmax-grade & .grade-minmax-max classes & avoid breaking grades in stylesheet.css & ReportCards.fnc.php
- Fix get Min. Max. grades for students in distinct grade levels in FinalGrades.php
- Fix SQL syntax error since 10.0 in Administration.php
- CSS Do not break words inside lists in stylesheet.css
- SQL handle case when student dropped and then later re-enrolled in course in DuplicateAttendance.php
- Use DBEscapeIdentifier() for Gradebook ASSIGNMENT_SORTING in Assignments.php, GradebookBreakdown.php & Grades.php

Changes in 10.2
---------------
- Add StudentCanEnrollNextSchoolYear() & StudentEnrollNextSchoolYear() functions in Enrollment.fnc.php
- Add "Enroll student for next school year" in Enrollment.inc.php
- Translate "Enroll student for next school year" to French & Spanish in rosariosis.po
- MySQL fix character encoding when translating database in InstallDatabase.php

Changes in 10.1
---------------
- Fix MySQL 5.6 syntax error when WHERE without FROM clause, use dual table in TakeAttendance.php, Reminders.php,  InputFinalGrades.php, Requests.php & Calendar.php
- Add dual VIEW for compatibility with MySQL 5.6 to avoid syntax error when WHERE without FROM clause in rosariosis.sql & Update.fnc.php
- Fix MySQL 5.6 syntax error in ORDER BY use report_card_comments table instead of dual in InputFinalGrades.php
- Fix SQL use cast(extract(DOW) AS int) for PostrgeSQL in Calendar.php
- Add instructions for MySQL in INSTALL.md, INSTALL_es.md & INSTALL_fr.md

Changes in 10.0
---------------
- SQL convert table names to lowercase, program wide
- Fix delete file attached in StudentFees.php
- Use DBEscapeIdentifier() for reserved 'column' keyword in plugins/Moodle/
- Avoid regression due to lowercase table names: Maintain compatibility with add-ons using rollover_after action hook & `$_REQUEST['tables']` in Rollover.php
- Use db_trans_*() functions in DeleteTransaction.fnc.php & DeleteTransactionItem.fnc.php
- Close popup if no UserSchool in session, happens on login redirect in Warehouse.php
- SQL order Grade Levels in StudentBreakdown.php
- Remove semicolon before "With" & "On" values in PrintRequests.php & unfilledRequests.inc.php
- HTML Link is selected: bold in ScheduleReport.php
- Display Period title if no short name set in IncompleteSchedules.php
- Fix Widget search & add Search Terms header in IncompleteSchedules.php
- Add Schedule link & photo tooltip to Student name in Scheduling/AddDrop.php
- HTML add a11y-hidden label to select in GPARankList.php & Attendance/TeacherCompletion.php
- Fix unset requested dates in MassCreateAssignments.php & Assignments.php
- Add User / Student photo tooltip in Grades/TeacherCompletion.php, GPARankList.php & EnterEligibility.php
- SQL order by Period title in TeacherCompletion.php
- Use Period's Short Name when > 10 columns in the list in TeacherCompletion.php
- Add note on save in EntryTimes.php
- Fix PHP8.1 Deprecated passing null to parameter in EmailReferral.fnc.php, CategoryBreakdown.php & StudentGrades.php
- Add Total sum of balances in StaffBalances.php
- Fix French translation for "Waiver" & "Refund" in rosariosis.po
- Force title & action to lowercase in Prompts.php
- HTML use .dashboard-module-title CSS class for module titles in Profiles.php & Exceptions.php
- CSS set input label max-width on Search form in stylesheet.css
- JS new default popup size: 1200x450 in warehouse.js
- Use URLEscape() for add button link when appropriate in ListOutput.fnc.php
- JS set Calendar date to current fields date in warehouse.js & calendar-setup.js
- HTML add label to select in ActivityReport.php
- Use Currency() function instead of number_format() in TransactionsReport.php
- HTML remove line-break in Warning/Minimum columns in Reminders.php
- HTML CSS make Daily Menus calendar coherent with School Calendar in DailyMenus.php
- Shorten Referral email subject in EmailReferral.fnc.php
- Use plural wise ngettext() for "No %s were found." in FinalGrades.php, GradeBreakdown.php, ReportCardComments.php, ReportCards.php & Transcripts.php
- Force result text to lowercase for "No %s were found." in ListOutput.fnc.php, FinalGrades.php, GradeBreakdown.php, ReportCardComments.php, ReportCards.php & Transcripts.php
- Prevent admin from removing own access to User Profiles program in Profiles.php
- SQL change modname column type from text to varchar(150) to match with MySQL key index limitation in rosariosis.sql
- SQL change program column type from text to varchar(100) NOT NULL to match with MySQL index limitation in rosariosis.sql
- SQL change schools column type from text to varchar(150) to match with MySQL index limitation in rosariosis.sql
- Rename YEAR_MONTH column alias to YEAR_MONTH_DATE: reserved keyword in MySQL in Dashboard.inc.php
- SQL use DAYOFWEEK() for MySQL or cast(extract(DOW)+1 AS int) for PostrgeSQL, program wide
- SQL cast(AS UNSIGNED) for MySQL or cast(AS INT) for PostgreSQL, program wide
- SQL cast custom_fields ID AS char(10) instead of TEXT for MySQL compatibility in GetStaffList.fnc.php, GetStuList.fnc.php & Search.fnc.php
- SQL rename $field COLUMN (reserved keyword) to COLUMN_NAME for MySQL compatibility in CustomFields.fnc.php, GetStaffList.fnc.php, GetStuList.fnc.php & Search.fnc.php
- SQL remove use of nextval in rosariosis_fr.sql
- Rename $pg_dumpPath configuration variable to $DatabaseDumpPath in config.inc.sample.php, diagnostic.php & DatabaseBackup.php
- Build command for executing mysqldump in DatabaseBackup.php
- SQL to extract Unix timestamp or epoch from date in Eligibility/Student.php, StudentList.php & TeacherCompletion.php
- Install module/plugin: execute the install_mysql.sql script for MySQL in Modules.inc.php, Plugins.inc.php & modules/README.md & plugins/README.md
- Fix typo "inexistant" to "nonexistent" & update translations in Modules.inc.php, Plugins.inc.php & rosariosis.po
- HTML fix duplicated #menu-top div on update in Side.php
- JS fix #body height calculation: include bottom margin in jquery-fixedmenu.js & plugins.min.js
- Add MySQLRemoveDelimiter() remove DELIMITER $$ declarations before procedures or functions in database.inc.php, Modules.inc.php & Plugins.inc.php
- SQL ORDER BY SORT_ORDER IS NULL,SORT_ORDER (nulls last) for consistency between PostgreSQL & MySQL, program wide
- Rollback Fix PostgreSQL error invalid ORDER BY, only result column names can be used, program wide
- HTML use number input for Gradebook config options in Configuration.php
- HTML use number input for Grade points & average in ReportCardGrades.php
- SQL limit results to current school year in AddDrop.php
- SQL always use INTERVAL to add/subtract days to date for MySQL compatibility in Reminders.php, Transactions.php, ServeMenus.php, Assignments.php, StudentGrades.php, Rollover.php & Portal.php
- SQL change amount columns type from numeric to numeric(14,2) NOT NULL in rosariosis.sql & StudentFees.php
- SQL change minutes,minutes_present,points,default_points,length,count_weighted_factors,count_unweighted_factors columns type from numeric to integer in rosariosis.sql, UpdateAttendanceDaily.fnc.php, Assignments.php, MassCreateAssignments.php & Periods.php
- SQL change gp & gpa columns type from numeric to numeric(7,2) in rosariosis.sql
- SQL change sum/cum factors & credit_attempted/earned columns type from numeric to double precision in rosariosis.sql
- Add Can use modname to HACKING ATTEMPT error email in ErrorMessage.fnc.php
- Fix HACKING ATTEMPT when Grades module inactive in Portal.php & Calendar.php
- Use GetTemplate() instead of unescaping `$_REQUEST` in CreateParents.php & NotifyParents.php
- Use `$_POST` to get password instead of unescaping `$_REQUEST` in PasswordReset.php, Student.php & User.php
- Use DBGetOne() instead of unescaping `$_REQUEST` in Config.fnc.php
- Add MySQL support in database.inc.php, diagnostic.php, InstallDatabase.php & Warehouse.php
- Add $DatabaseType configuration variable in database.inc.php, diagnostic.php, InstallDatabase.php, Warehouse.php & config.inc.php
- Add $show_error parameter to db_start() in database.inc.php
- Add DBUnescapeString() function in database.inc.php, GetStuList.fnc.php, ListOutput.fnc.php, PreparePHP_SELF.fnc.php & Search.fnc.php
- PostgreSQL Date format: move query from Date.php to Warehouse.php
- Compatibility with add-ons version < 10.0, gather CONFIG (uppercase table name) values too in Configuration.php
- Fix MySQL error Table is specified twice, both as a target for 'INSERT' and as a separate source for data in CopySchool.php & Rollover.php
- Fix MySQL syntax error: no table alias in DELETE in Rollover.php
- Fix MySQL syntax error: no FROM allowed inside UPDATE, use subquery or multi-table syntax in Rollover.php
- Fix MySQL syntax error: replace CAST (NULL AS CHAR(1)) AS CHECKBOX with NULL AS CHECKBOX in AddAbsences.php, AddActivity.php, MassDrops.php, MassRequests.php, MassSchedule.php, AddUsers.php, AssignOtherInfo.php & AddStudents.php
- Add Installation tutorial for Mac in WHATS_NEW.md & INSTALL.md, INSTALL_fr.md & INSTALL_es.md
- Update tested on Ubuntu 18.04 to 20.04 in INSTALL.md, INSTALL_fr.md & INSTALL_es.md
- Fix SQL error when column already dropped in Fields.fnc.php
- SQL fix CREATE INDEX on right table in rosariosis.sql
- SQL remove unused indices for various tables in rosariosis.sql
- SQL match index with FOREIGN KEY for various tables in rosariosis.sql
- SQL ORDER BY fix issue when Transferring to another school & new start date is <= old start date in Enrollment.inc.php
- Check if student already enrolled on that date when inserting START_DATE in SaveEnrollment.fnc.php
- Add `_getAddonsSQL()` & `_configTableCheck()` functions in InstallDatabase.php
- $DatabasePort configuration variable is now optional in config.inc.sample.php, INSTALL.md, INSTALL_es.md & INSTALL_fr.md
- SQL start staff_fields ID sequence at 200000000 for coherence with custom_fields in rosariosis.sql & Fields.fnc.php
- MySQL use LONGTEXT type for textarea field in Fields.fnc.php & DisciplineForm.php
- SQL Check requested assignment belongs to teacher in Assignments.php
- CSS fix responsive when really long string with no space in stylesheet.css
- Limit `$_POST` array size to a maximum of 16MB in Warehouse.php, thanks to @ahmad0x1
- Add optional ROSARIO_POST_MAX_SIZE_LIMIT constant in Warehouse.php, INSTALL.md, INSTALL_es.md & INSTALL_fr.md
- Add MySQL database dump in rosariosis_mysql.sql
- Log "RosarioSIS HACKING ATTEMPT" into Apache error.log in HackingLog.fnc.php
- Force URL & menu reloading, always use JS to redirect in HackingLog.fnc.php
- Place currency symbol after amount for some locales in Currency.fnc.php
- SQL use timestamp type: standard & without time zone by default in rosariosis.sql
- CSS add .accounting-totals, .accounting-staff-payroll-totals, .student-billing-totals classes in Expenses.php, Incomes.php, Salaries.php, StaffPayments.php, StudentFees.php & StudentPayments.php
- SQL rename KEY (reserved keyword) to SORT_KEY for MySQL compatibility in Search.fnc.php, StudentFieldBreakdown.php, StudentBreakdown.php
- SQL use GROUP BY instead of DISCTINCT ON for MySQL compatibility in Address.inc.php & EnterEligibility.php
- SQL cast Config( 'STUDENTS_EMAIL_FIELD' ) to int when custom field in SendNotification.fnc.php, Registration.fnc.php, Moodle/getconfig.inc.php & ImportUsers.fnc.php
- Fix MySQL 5.6 error Can't specify target table for update in FROM clause in PortalPollsNotes.fnc.php, DeleteTransaction.fnc.php, DeleteTransactionItem.fnc.php, Rollover.php, CopySchool.php & AssignOtherInfo.php
- Fix MySQL syntax error: explicitly list all columns instead of wildcard in ActivityReport.php & Statements.php
- Fix MakeChooseCheckbox() remove parent link to sort column in Inputs.php & ListOutput.fnc.php
- CSS WPadmin fix menu select width in stylesheet.css
- Enrollment Start: No N/A option for new student in StudentUsersInfo.fnc.php

Changes in 9.3.2
----------------
- Fix regression since 9.2.1 fields other type than Select Multiple from Options in CategoryBreakdownTime.php

Changes in 9.3.1
----------------
- Fix regression since 2.9 Schedule multiple courses in plugins/Moodle/Scheduling/MassSchedule.php
- Fix SQL to select Periods where exists CP in TeacherCompletion.php & Administration.php
- Fix dummy day (year month date) set to 28 for February in Dashboard.inc.php
- Fix AllowEdit for Teacher in Users/includes/General_Info.inc.php
- Security: sanitize filename with no_accents() in Student.php, User.php & Schools.php
- Fix "Exclude PDF generated using the "Print" button" option for the PDF Header Footer plugin in Bottom.php

Changes in 9.3
--------------
- Handle case where Course Period Parent ID is null in Courses.php
- SQL order by Period title in Periods.php, DailySummary.php & StudentSummary.php
- SQL get Period title if no short name set in AddAbsences.php
- Use DBLastInsertID() instead of DBSeqNextID() in Moodle/includes/ImportUsers.fnc.php
- Still use DBSeqNextID() for student ID, adapt for MySQL in Student.php & Moodle/includes/ImportUsers.fnc.php
- SQL use CONCAT() instead of pipes || for MySQL compatibility, program wide
- Fix first item in the list not displayed in Accounting/includes/DailyTransactions.php
- SQL time interval for MySQL compatibility in PasswordReset.php & index.php
- SQL use CAST(X AS char(X)) instead of to_char() for MySQL compatibility in Dashboard.inc.php & Reminders.php
- SQL result as comma separated list for MySQL compatibility in Grades/includes/Dashboard.inc.php & MasterScheduleReport.php
- Use DBEscapeIdentifier() for MySQL reserved 'TIMESTAMP' keyword in ServeMenus.php & Transactions.php
- SQL add `_SQLUnixTimestamp()` to extract Unix timestamp or epoch from date in Grades.php & Schedule.php
- Add case for MySQL: get next MP ID & set AUTO_INCREMENT+1 in EditHistoryMarkingPeriods.php
- Display Name: SQL use CONCAT() instead of pipes || for MySQL compatibility in Configuration.php & GetStuList.fnc.php
- config table: update DISPLAY_NAME to use CONCAT() instead of pipes || in Update.fnc.php

Changes in 9.2.2
----------------
- Fix SQL error lastval is not yet defined when editing field in SchoolFields.php, AddressFields.php, PeopleFields.php, StudentFields.php, UserFields.php & Assignments.php

Changes in 9.2.1
----------------
- Remove use of db_seq_nextval(), use auto increment, program wide
- SQL set default nextval (auto increment) for RosarioSIS version < 5.0 on install & old add-ons in Update.fnc.php
- SQL no more cast MARKING_PERIOD_ID column as text/varchar in rosariosis.sql & InputFinalGrades.php
- PLpgSQL compact & consistent function declaration in rosariosis.sql
- Use DB transaction statements compatible with MySQL in database.inc.php
- Add DBLastInsertID() & deprecate DBSeqNextID() + db_seq_nextval() in database.inc.php
- SQL rename character varying & character data types to varchar & char in rosariosis.sql
- SQL replace use of STRPOS() with LIKE, compatible with MySQL in PortalPollNotes.fnc.php & Courses.php
- SQL fix French & Spanish translation for Create Parent Users & Notifiy Parents email templates in rosariosis_fr.sql & rosariosis_es.sql
- Use DBLastInsertID() instead of DBSeqNextID(), program wide
- SQL TRIM() both compatible with PostgreSQL and MySQL in AttendanceSummary.php & CopySchool.php
- SQL use extract() or SUBSTRING() or REPLACE() instead of to_char() for MySQL compatibility, program wide
- Fix No Address contact not properly saved for student / parent in RegistrationSave.fnc.php
- AddDBField() Change $sequence param to $field_id, adapted for use with DBLastInsertID() in Fields.fnc.php, SchoolFields.php, AddressFields.php, PeopleFields.php, StudentFields.php & UserFields.php
- Raise Frame file size limit to 5MB in HonorRoll.fnc.php
- Fix Marking Period not found in user School Year (multiple browser tabs case) in MassSchedule.php & MassDrops.php
- Fix Course not found in user School Year (multiple browser tabs case) in MassRequests.php
- HTML add label to inputs in Requests.php
- Remove help sentence. The Scheduler is not run by the Student Requests program in Help_en.php

Changes in 9.2
--------------
- Fix SQL error invalid input syntax for integer in Administration.php
- SQL student_report_card_grades table: convert MARKING_PERIOD_ID column to integer in Update.fnc.php, rosariosis.sql, EditReportCardGrades.php, FinalGrades.php & ReportCards.fnc.php

Changes in 9.1.1
----------------
- Fix PHP8.1 fatal error unsupported operand types: string / int in Assignments.php & MassCreateAssignments.php
- Fix selected Subject lost on Comment Category delete in ReportCardComments.php
- Fix Color Input was hidden in ReportCardComments.php
- Fix use Course ID in session in MassRequests.php
- Fix SQL error primary key exists on table food_service_staff_accounts in Rollover.php
- Fix SQL error foreign key exists on tables gradebook_assignments,gradebook_assignment_types,schedule_requests in Rollover.php
- Fix save State input value in Registration.fnc.php
- Fix SchoolInfo() on user School Year update in School.php

Changes in 9.1
--------------
- Fix stored XSS security issue: decode HTML entities from URL in PreparePHP_SELF.fnc.php, thanks to @domiee13
- Capitalize month when date is only month and year in Dashboard.inc.php
- Add decimal & thousands separator configuration in Help_en.php, Currency.fnc.php, Configuration.php, rosariosis.sql & rosariosis_fr.sql
- Use Currency() for Food Service Balance value in Widget.php & StaffWidget.php
- Add Class average in InputFinalGrades.php & Grades.fnc.php
- Update French & Spanish translation in rosariosis.po & help.po
- Update Default School Year to 2022 in config.inc.sample.php & rosariosis.sql

Changes in 9.0
--------------
- CSS add length to previous meals select in DailyMenus.php
- CSS FlatSIS fix calendar menu text wrapping in stylesheet.css
- Add Export list button in TransactionsReport.php
- Add Food Service icon to list in ServeMenus.php
- Add User / Student photo tooltip in ServeMenus.php, Transactions.php & TeacherCompletion.php
- HTML add horizontal ruler before each category in MakeReferral.php
- Fix SQL error when generating Schedule table with PHP8.1 in GetMP.php
- Reorder PDF list columns to match Schedule columns in PrintSchedules.php
- SQL order Schedule list by Course Title & Course Period Short Name in Schedule.php, PrintSchedules.php & Schedule.inc.php
- Fix SQL error more than one row returned by a subquery in Rollover.php
- Fix update Course Period title when Short Name contains single quote in Courses.php
- Fix PHP8.1 deprecated function parameter is null, program wide
- Fix PHP8.1 deprecated automatic conversion of false to array in StudentsUsersInfo.fnc.php
- Fix PHP8.1 deprecated automatic conversion of float to int in ImageResizeGD.php
- Add Student Photo Tip Message in AddDrop.php & StudentList.php
- Format Enrollment Start & End Date in Export.php
- Add Student name if no Contacts at address in MailingLabel.fnc.php
- Do not Export Delete column in Periods.php & GradeLevels.php
- HTML group inputs inside fieldset (tab title or program name) in Configuration.php
- Hide Comment Codes tip message if Comments unchecked for Marking Period in InputFinalGrades.php
- Add Get Student Labels Form JS (Disable unchecked fieldset) in StudentLabels.fnc.php & StudentLabels.php
- Fix PHP8.1 deprecated use PostgreSQL $db_connection global variable in database.inc.php & Grades/includes/Dashboard.inc.php
- Don't Delete Gender & Birthday Student Fields in Fields.fnc.php
- CSS set cursor for .tipmsg-label in stylesheet.css
- Add Username to Password Reset email in PasswordReset.php
- `intl` PHP extension is now required in diagnostic.php & INSTALL.md
- Fix PHP8.1 deprecated strftime() use strftime_compat() instead in Side.php, Date.php, PHPCompatibility.php, strftime_compat.php, Dashboard.inc.php & Preferences.php
- Add $course_period_id param to limit check to a single Course Period in Courses.fnc.php & Courses.php
- Add title to Contact & Address button images in Address.inc.php & GetStuList.fnc.php
- CSS select max-width 440px in stylesheet.css & zresponsive.css
- HTML add label to Points inputs to correct alignment in Grades.php
- HTML add a11y-hidden label to select in CategoryBreakdown.php, CategoryBreakdownTime.php & StudentFieldBreakdown.php
- Place Go button right after Timeframe in DailyTransactions.php, DailyTotals.php, CategoryBreakdown.php, CategoryBreakdownTime.php, StudentFieldBreakdown.php & Percent.php
- Fix French translation for "Not due" in rosariosis.po
- Move Transcript Include form checkboxes up in Transcripts.fnc.php
- Add Delete button for Submission File in StudentAssignments.fnc.php
- Fix SQL error null value in column "title" violates not-null constraint in MassCreateAssignments.php
- Reorder & rename Course Periods columns to match Schedule program in MassCreateAssignments.php
- Fix get History Grades Grade Level short name only if no Grade Level available in Transcripts.fnc.php
- Fix get Student Photo from previous year in Transcripts.fnc.php
- Fix SQL error invalid input syntax in PrintSchedules.php & TeacherCompletion.php, thanks to @scgajge12
- Filter IP, HTTP_* headers can be forged in index.php, PasswordReset.php & ErrorMessage.fnc.php
- Fix SQL error invalid input syntax for integer, program wide
- Fix PHP8.1 fatal error checkdate argument must be of type int in Calendar.php
- Fix SQL error invalid input syntax for type date in Calendar.php
- Fix SQL error duplicate key value violates unique constraint "attendance_calendar_pkey" in Calendar.php
- Fix PHP fatal error Unsupported operand types in ListOutput.php
- Add AttrEscape() function in Inputs.php
- Use AttrEscape() instead of htmlspecialchars(), program wide
- Add use of AttrEscape(), program wide
- Maintain Advanced search when editing Timeframe in Percent.php
- Fix SQL injection escape DB identifier in RegistrationSave.fnc.php, Calendar.php, MarkingPeriods.php, Courses.php, SchoolFields.php, AddressFields.php, PeopleFields.php, StudentFields.php, UserFields.php & Referrals.php
- JS update marked to v4.0.14 in assets/js/marked/ & warehouse_wkhtmltopdf.js
- JS add DOMPurify 2.3.6 in assets/js/DOMPurify/ & Gruntfile.js
- JS fix stored XSS issue related to MarkDown in warehouse.js & plugins.min.js, thanks to @intrapus
- JS remove logged in check on history back in warehouse.js & plugins.min.js
- Add CSRF token to protect unauthenticated requests in Warehouse.php & login.php
- Add CSRF token to logout URL in login.php, Warehouse.php, PasswordReset.php, Bottom.php, Student.php & User.php, thanks to @khanhchauminh
- Logout after 10 Hacking attempts within 1 minute in HackingLog.fnc.php
- Destroy session now: some clients do not follow redirection in HackingLog.fnc.php
- Add use of URLEscape(), program wide
- Use URLEscape() for img src attribute, program wide
- Sanitize / escape URL as THEME is often included for button img src attribute in User.fnc.php
- Better format for "Add another marking period" form in EditReportCardGrades.php
- Fix Improper Access Control security issue: add random string to photo file name in TipMessage.fnc.php, Transcripts.fnc.php, PrintClassPictures.php, Student.php, User.php & General_Info.inc.php, thanks to @dungtuanha
- Fix stored XSS security issue: decode HTML entities from URL in PreparePHP_SELF.fnc.php, thanks to @khanhchauminh
- Fix stored XSS security issue: remove inline JS from URL in PreparePHP_SELF.fnc.php, thanks to @intrapus & @domiee13
- Fix stored XSS security issue: add semicolon to HTML entity so it can be decoded in PreparePHP_SELF.fnc.php, thanks to @intrapus
- Accessibility: add hidden input label using .a11y-hidden class in ReportCardComments.php, StudentFields.php & Grades/TeacherCompletion.php
- Accessibility: add select label in Eligibility/TeacherCompletion.php, Student.php, StudentList.php, MassDrops.php & MassSchedule.php
- Two Lists on same page: export only first, no search in Eligibility/Student.php
- Remove photos on delete in Student.php & User.php, thank to @jo125ker
- Remove Student Assignment Submission files on delete in Assignments.php, thank to @khanhchauminh
- Add microseconds to filename format to make it harder to predict in Assignments.php & StudentAssignments.fnc.php, thanks to @khanhchauminh
- Restrict Sort Order input number range, program wide
- Restrict Price / Amount / Balance input number range, program wide, thanks to @nhienit2010
- Restrict input number step in Courses.fnc.php
- Restrict diagnostic access to logged in admin in diagnostic.php, thanks to @intrapus
- Fix SQL error value too long for type character varying(50) in Schools.php
- Add Secure RosarioSIS link in INSTALL.md
- Add Calendar days legend in Calendar.php
- CSS add .legend-square class in stylesheet.css & colors.css
- Create / Edit / Delete calendar: use button() in Calendar.php
- Update Calendars help text in Help_en.php & help.po
- Add translations for Calendar days legend in rosariosis.po
- Use json_encode() for AjaxLink() URL, program wide
- SQL skip "No Address" contacts to avoid lines with empty Address fields in Export.php
- French translation: remove capitalization & use articles in rosariosis.po, help.po & rosariosis_fr.sql
- JS Sanitize string for legal variable name in Export.php & Inputs.php
- Remove deprecated `_makeTeacher()` function in ReportCards.fnc.php
- Use multiple select input for grades list to gain space in Widget.php
- Fix regression since 5.0, allow Administration of "Lunch" attendance categories in Administration.php, AttendanceCodes.fnc.php & colors.css
- SQL set default FAILED_LOGIN_LIMIT to 30 in rosariosis.sql, thanks to @domiee13
- JS Hide Options textarea if Field not of select type in Fields.fnc.php
- Add Balance widget in StudentBalances.php
- Add Total sum of balances in StudentBalances.php
- Fix SQL error check requested UserSyear & UserSchool exists in DB in Side.php, Search.fnc.php & SaveEnrollment.fnc.php
- HTML use number input for Class Rank widget in Widget.php
- Check default if school has no default calendar in Calendar.php
- CSS do not capitalize date in stylesheet.css
- Remove unused index ON attendance_period (attendance_code) & ON student_report_card_grades (school_id) in rosariosis.sql & rosariosis_mysql.sql
- SQL VACUUM & ANALIZE are for PostgreSQL only in Scheduler.php

Changes in 8.9.6
----------------
- Fix Stored XSS security issue: escape textarea HTML in Inputs.php, thanks to @jo125ker

Changes in 8.9.5
----------------
- Fix stored XSS security issue: do not allow unsanitized XML & HTML in FileUpload.fnc.php, thanks to @nhienit2010
- Fix stored XSS security issue: escape HTML attribute in StudentAssignments.fnc.php, thanks to @dungtuanha
- Use big random number for parent password generation in NotifyParents.php & createParents.php, thanks to @intrapus
- Add microseconds to filename format to make it harder to predict in StudentAssignments.fnc.php, thanks to @dungtuanha

Changes in 8.9.4
----------------
- Fix SQL injection sanitize all `$_REQUEST` keys in Warehouse.php, thanks to @nhienit2010
- Fix reflected XSS via mime-type in FileUpload.fnc.php, thanks to @nhienit2010

Changes in 8.9.3
----------------
- Fix stored XSS security issue: do not allow unsanitized SVG in FileUpload.fnc.php, thanks to @scgajge12 & @crowdoverflow

Changes in 8.9.2
----------------
- Fix invalidate User School in session on login in index.php

Changes in 8.9.1
----------------
- Fix regression since 8.6 Mailing Labels widget HTML in Widgets.php

Changes in 8.9
--------------
- Fix GetTeacher() when newly inserted teacher in GetTeacher.fnc.php
- Remove Half Day option in AddAbsences.php, Administration.php, TakeAttendance.php, Courses.php, Courses.fnc.php & Rollover.php
- JS Hide "+ New Period" link onclick in Courses.php
- CSS FlatSIS fix bottom button line height in stylesheet.css
- Add help texts & translations for the Scheduling > Courses program in Help_en.php & help.po
- Correct typos in Spanish help texts in help.po
- Fix Locked column value on list export in Schedule.php
- Student / User Photo input: only accept .jpg,.jpeg,.png,.gif in General_Info.inc.php
- Increase Food Service icon width to 48px in FS_Icons.inc.php & MenuItems.php
- HTML add Add-on upload input title in Modules.inc.php & Plugins.inc.php
- Fix do not resubmit form on List Export in Incomes.php & Expenses.php
- Fix List Export columns: hide Delete & show File Attached in Expenses.php, Incomes.php, Salaries.php, StaffPayments.php, StudentFees.php & StudentPayments.php
- Check AllowEdit() on Event deletion in Calendar.php
- Food Service icon upload in MenuItems.php
- Add French & Spanish translation for "Icon successfully uploaded." in rosariosis.po

Changes in 8.8
--------------
- Fix proc_open() PHP function not allowed in PDF.php
- Fix PHP Warning A non-numeric value encountered in ReportCards.fnc.php
- Fix PHP Fatal error Unsupported operand types in Teacher Programs: do not search Students List, unset in CustomFields.fnc.php
- Add 'staff_' prefix to first & last inputs on Find a User form in GetStaffList.fnc.php & Search.fnc.php
- Remove icons from Ungraded column, use only number in StudentGrades.php
- Exclude 0 points assignments from Ungraded count in StudentGrades.php
- Date select increase years options from +5 to +20 in Date.php
- JS Raise height by 1 submenu item so we stay above browser URL in warehouse.js
- Add Min. and Max. GPA to Last row in Grades.fnc.php & ReportCards.fnc.php
- Add Class Rank to Last row in Grades.fnc.php & ReportCards.fnc.php

Changes in 8.7
--------------
- Rector fix bad code in functions/, classes/core/, ProgramFunctions/
- Update tested on: not compatible with Internet Explorer in INSTALL.md, INSTALL_es.md & INSTALL_fr.md
- Add ProgramFunctions/SendEmail.fnc.php|send_error action hook in SendEmail.fnc.php
- EasyCodingStandard use short array notation in functions/, classes/core/, ProgramFunctions/, modules/ & plugins/
- Fix month + year format, remove day (regression since 7.1) in Dashboard.inc.php
- ProgramUserConfig() always return array, not null in Config.fnc.php & \_makeLetterGrade.fnc.php
- Allow redirect to Take Attendance, no fatal error if no current MP in Portal.php
- CSS fix checkbox & radio input vertical align on Firefox in stylesheet.css
- CSS fix menu hover right arrow position when module name on 2 lines in stylesheet.css
- CSS fix font-size auto-adjust on iPhone in stylesheet.css
- Fix typo in English string, update translations in Rollover.php & rosariosis.mo
- JS fix menu & scroll issue on smartphone landscape > 735px in warehouse.js & jquery-fixed.menu.js
- FlatSIS theme: use Grunt to minify in Gruntfile.js
- FlatSIS theme: do not import WPadmin theme stylesheet anymore in stylesheet.css, stylesheet_wkhtmltopdf.css
- Fix SQL transcript_grades view, grades were duplicated for each school year in rosariosis.sql & Update.fnc.php

Changes in 8.6.1
----------------
- Add .webp image to FileExtensionWhiteList() in FileUpload.fnc.php
- Fix SQL error table name "sam" specified more than once in Widget.php

Changes in 8.6
--------------
- Add (Student) Widgets class in classes/core/Widgets.php
- Add (Student) Widget interface and individual Widget classes in classes/core/Widget.php
- Use RosarioSIS\Widgets in Widgets.fnc.php
- Add StaffWidgets class in classes/core/StaffWidgets.php
- Add StaffWidget interface and individual StaffWidget classes in classes/core/StaffWidget.php
- Use RosarioSIS\StaffWidgets in StaffWidgets.fnc.php
- Admin Student Payments Delete restriction: also exclude Refund in StudentPayments.php & Student_Billing/functions.inc.php
- Fix PHP Fatal error unsupported operand types when (Staff)Widgets() & $extra used for Parent / Student in Widgets.fnc.php & StaffWidgets.fnc.php
- Fix PHP Fatal error canBuild() must be compatible with Widget::canBuild(array $modules) in Widget.php & StaffWidget.php
- Fix SQL error more than one row returned by a subquery in Search.fnc.php

Changes in 8.5.2
----------------
- Fix PHP Fatal error cannot redeclare `_rosarioLoginURL()` (regression since 8.3) in MarkDownHTML.fnc.php

Changes in 8.5.1
----------------
- Fix SQL syntax error in ORDER BY (regression since 8.3.1) in Substitutions.php

Changes in 8.5
--------------
- Fix SQL error duplicate key value violates unique constraint "food_service_menus_title" in Menus.php
- SQL add PRIMARY KEY to staff_exceptions table in rosariosis.sql
- SQL profile_exceptions & staff_exceptions tables: Add Admin Student Payments Delete restriction in Update.fnc.php & rosariosis.sql
- Add Admin Student Payments Delete restriction in Profiles.php & Exceptions.php
- Add Admin Student Payments Delete restriction in StudentPayments.php & Student_Billing/functions.inc.php
- Fix SQL error numeric field overflow when entering percent > 100 in MassCreateAssignments.php
- HTML Sort Order input type number in MarkingPeriods.php

Changes in 8.4
--------------
- SQL gradebook_grades table: Change comment column type to text in Update.fnc.php & rosariosis.sql
- Increase Grades Comment input maxlength to 500 chars in Grades.php
- Fix use more coherent number_format() precision & no thousand separator in Percent.php, Assignments.php, StudentGrades.php, Grades.fnc.php & EditReportCardGrades.php
- SQL order fields list by Category & SORT_ORDER in AssignOtherInfo.php
- Fix SQL error numeric field overflow when entering percent > 100 in Assignments.php
- Comments length > 60 chars, responsive table ColorBox in EditReportCardGrades.php, FinalGrades.php, Grades.php, InputFinalGrades.php & StudentGrades.php
- Add File Attached to Incomes in Incomes.php & Accounting/functions.inc.php
- Add File Attached to Expenses in Expenses.php
- SQL accounting_incomes table: Add FILE_ATTACHED column in Update.fnc.php & rosariosis.sql
- Fix SQL error when no user in session in Template.fnc.php
- Correct help text note for User deletion in Help_en.php & help.po

Changes in 8.3.1
----------------
- Fix SQL exclude fields of 'files' type in Substitutions.php
- SQL order fields list by Category & SORT_ORDER in Substitutions.php
- Fix force numeric separator "." when no en_US locale, use C locale in Warehouse.php
- Fix Advanced Search > General Info text fields when adding Username in Search.fnc.php

Changes in 8.3
--------------
- Fix PHP Warning non-numeric value encountered, use rounded percent grade in StudentGrades.php
- Security Fix reflected XSS: encode HTML special chars for search_term in Courses.php
- Add File Attached to Staff Payments in StaffPayments.php & Accounting/functions.inc.php
- Add File Attached to Payments in StudentPayments.php & Student_Billing/functions.inc.php
- SQL accounting_payments table: Add FILE_ATTACHED column in Update.fnc.php & rosariosis.sql
- SQL billing_payments table: Add FILE_ATTACHED column in Update.fnc.php & rosariosis.sql
- Add help note for student deletion & translate in Help_en.php & help.po
- Add RosarioSIS URL to image path in MarkDownHTML.fnc.php
- Fix SQL error invalid byte sequence for encoding "UTF8": 0xde 0x20 in Security.php

Changes in 8.2.1
----------------
- Fix SQL for Warning when only 0 points assignments in Assigments.php

Changes in 8.2
--------------
- Fix replace regex: remove slash & allow space in FileUpload.fnc.php
- Always Use Last Year's Picture if Missing in PrintClassLists.php
- Fix #329 SQL error division by zero in t_update_mp_stats(): set min Credits to 1 in Courses.fnc.php
- Fix SQL error when Teacher name has single quote in Courses.php
- CSS FlatSIS remove useless line-height for tabs in stylesheet.css

Changes in 8.1.1
----------------
- Fix security issue #328 unauthenticated access to Side.php in Warehouse.php, thanks to @ijdpuzon
- Fix security issue #328 sanitize `$_POST` school, syear, mp & period parameters in Side.php

Changes in 8.1
--------------
- Remove @ error control operator on pg_exec: allow PHP Warning in database.inc.php
- Fix Address Field sequence name in AddressFields.php
- Remove deprecated DBSeqConvertSerialName() function in database.inc.php
- Fix Conflict Warning displayed twice in Courses.php
- Fix PHP Notice Undefined index in miscExport.fnc.php
- Fix SQL error when Student / Staff ID is hacked / not an integer in URL in Current.php
- SQL accounting_salaries table: Add FILE_ATTACHED column in Update.fnc.php & rosariosis.sql
- Add File Attached to Salaries in Salaries.php & Accounting/functions.inc.php
- SQL billing_fees table: Add FILE_ATTACHED column in Update.fnc.php & rosariosis.sql
- Add File Attached to Fees in StudentFees.php & Student_Billing/functions.inc.php
- Fix Student Widgets for Advanced Search exports in GetStaffList.fnc.php, GetStuList.fnc.php & Search.inc.php
- Add Export fields list (form) & Export fields list + extra SQL (student list) action hooks in Export.php & Actions.php
- Do not remove Full Day and Half Day school periods from the Schedule table in PrintSchedules.php
- Fix 403 Forbidden error due to pipe "|" in URL when using Apache 5G rules in Widgets.fnc.php

Changes in 8.0.4
----------------
- Fix default Student/Parent program in Attendance/Menu.php

Changes in 8.0.3
----------------
- Fix #324 Show Student Photo in Transcripts.fnc.php

Changes in 8.0.2
----------------
- Fix User Widgets Search Terms in Users/Search.inc.php

Changes in 8.0.1
----------------
- Fix #322 PHP syntax error, unexpected ')' in DailySummary.php

Changes in 8.0
--------------
- Add Total from Payments & Total from Fees fields to Advanced Report in Export.php
- Upgrade grunt, grunt-contrib-cssmin, grunt-contrib-uglify & grunt-contrib-watch & remove grunt-phpdoc in package.json & Gruntfile.js
- CSS minification optimizations in stylesheet.css & stylesheet_wkhtmltopdf.css
- JS uglify optimizations in plugins.min.js & plugins.min.js.map
- Upgrade Chart.js from 2.9.3 to 3.4.1 & save 40KB in chart.min.js & Charts.fnc.php
- Fix "The gradebook configuration has been modified." note appearing twice in Grades/Configuration.php
- Add warning in case all Assignments in Type have 0 Points (Extra Credit) in Assignments.php
- Update French & Spanish translations in rosariosis.po
- CSS FlatSIS shorten menu width & submenu links height + better contrast in stylesheet.css
- CSS FlatSIS list square bullets in stylesheet.css
- Default theme is now FlatSIS in rosariosis.sql
- CSS remove .radio-attendance-code class in stylesheet.css, rtl.css & TakeAttendance.php
- CSS remove Open Sans SVG fonts, format is deprecated in font.css & WPadmin/fonts/open
- Upgrade marked.js 0.8.2 to version 1.2.9 in assets/js/marked/
- Fix SQL error when $staff_id is 0 (no user in session) in Config.fnc.php
- Remove Waived Fees from list in Student_Billing/functions.inc.php
- New ROSARIO_DISABLE_ADDON_DELETE optional config constant in INSTALL.md, INSTALL_es.md & INSTALL_fr.md
- Add-on disable delete in Modules.inc.php & Plugins.inc.php
- Merge Daily Transactions & Daily Totals programs in DailyTransactions.php & DailyTotals.php
- Remove Daily Totals program from Student Billing & Accounting menus in Menu.php & rosariosis.sql
- Fix Totals calculation in Accounting/includes/DailyTotals.php
- Multibyte strings: check if not UTF-8 first to avoid cost of setting in Warehouse.php
- Fix false positive Hacking Attempt on Print button click when no user in session in Warehouse.php
- Merge Attendance Chart & Absence Summary programs in DailySummary.php & StudentSummary.php & Help_en.php
- Remove Absence Summary program from Attendance menu in Menu.php, Help_en.php & rosariosis.sql

Changes in 7.9.3
----------------
- Fix #318 PHP warning non-numeric value encountered for $LO_dir in ListOutput.fnc.php, thanks to @AhmadKakarr

Changes in 7.9.2
----------------
- Fix SQL error when single quote in Course Title in InputFinalGrades.php
- Fix include Semester course periods in the Schedule table in Schedule.inc.php
- Fix #316 CSRF security issue set cookie samesite to strict, thanks to @huntrdev

Changes in 7.9.1
----------------
- Fix remove file when has single quote in its name and actually delete file in Student.php, User.php & Schools.php
- Fix download backup filename when contains spaces: use double quotes in DatabaseBackup.php

Changes in 7.9
--------------
- Update default School Year to 2021 in rosariosis.sql & config.inc.sample.php

Changes in 7.8.4
----------------
- Fix User Marking Period title in GradeBreakdown.php
- SQL ORDER BY Teacher name in GradeBreakdown.php

Changes in 7.8.3
----------------
- Fix trim 0 (float) when percent > 1,000: do not use comma for thousand separator in Grades.php & ProgressReports.php

Changes in 7.8.2
----------------
- Fix try searching plural forms adding an 's' to singular form and with number set to 1 in Translator.php

Changes in 7.8.1
----------------
- CSS Edge browser fix: Do not merge focus-within styles with hover styles in stylesheet.css, stylesheet_wkhtmltopdf.css & rtl.css

Changes in 7.8
--------------
- Handle `multiple` files attribute in warehouse.js & Inputs.php
- Add FileUploadMultiple(). Handle `multiple` files attribute for FileUpload() in FileUpload.fnc.php
- Remove Reset button from Find a Student / User forms in Students/Search.inc.php & Users/Search.inc.php
- CSS & JS open submenu on focus & focus-within in warehouse.js, stylesheet.css & rtl.css
- CSS menu link & button color on focus in stylesheet.css & colors.css
- Fix check students Course Status in PrintClassLists.php, PrintClassPictures.php, ClassSearchWidget.fnc.php, Referrals.php, EmailReferral.fnc.php & Widgets.fnc.php
- Add Include Inactive Students checkbox in MasterScheduleReport.php & RequestsReport.php
- Fix unset current student (check Course Status) when MP updated in Side.php
- SQL fix Discipline Referrals using WHERE EXISTS in Widgets.fnc.php
- Numeric Discipline field: invert values so BETWEEN works in Widgets.fnc.php
- Numeric Discipline field: input type number in Widgets.fnc.php
- Fix SQL error missing FROM address table in GetStuList.fnc.php

Changes in 7.7
--------------
- Move Dashboard() call outside in Dashboard.fnc.php & Portal.php
- Add .xlsm,.key,.midi,.aif,.mpeg,.h264,.mkv,.log,.email,.eml,.emlx,.msg,.vcf extensions to white list in FileUpload.fnc.php
- Add "Last Name Middle Name First Name" option to Display Name in GetStuList.fnc.php & Configuration.php
- Fix SQL error escape course title in StudentGrades.php
- SQL Remove Salaries having a Payment (same Amount & Comments (Title), after or on Assigned Date) in Accounting/functions.inc.php
- SQL match Payment Comments LIKE Fee Title in Student_Billing/functions.inc.php
- CSS fix list line-height in FlatSIS/stylesheet_wkhtmltopdf.css

Changes in 7.6.1
----------------
- Fix #307 XSS update CodeIgniter Security class in classes/Security.php, thanks to @DustinBorn
- Move Portal Poll vote code to modfunc in PortalPollNotes.php & Portal.php
- Fix #308 Unauthenticated SQL injection. Use sanitized `$_REQUEST` in Portal.php, thanks to @DustinBorn
- Fix #308 sanitize key. Pass array keys through function in Warehouse.php, thanks to @DustinBorn
- Fix #309 unset `$_SESSION` so user cannot maintain dummy session in PasswordReset.php, thanks to @DustinBorn
- Remove use of `$_SESSION['STAFF_ID'] === '-1'` in User.fnc.php & PasswordReset.php

Changes in 7.6
--------------
- Fix login password with single quote, use POST in index.php & Preferences.php
- HTML Use #! instead of JS return false to not go back to top in Buttons.php & Profiles.php
- JS remove warehouse.min.js & include warehouse.js inside plugins.min.js in Gruntfile.js, assets/js/ & Warehouse.php
- Fix PHP8 compatibility issues (warnings & fatal errors), system wide
- Fix save new Grade with "0" as Title in ReportCardGrades.php
- PHP8 no xmlrpc ext: load xmlrpc compat functions in plugins/Moodle/client.php, xmlrpc.php, XML_RPC.php, XmlrpcDecoder.php & XmlrpcEncoder.php
- Fix xmlrpc nested arrays, use param & value elements instead in XmlrpcEncoder.php
- Fix SQL Total points only select assignments for CP teacher (teacher may have changed) in Grades.php, InputFinalGrades.php, StudentGrades.php & GradebookBreakdown.php
- Fix SQL Grades sort order in GradebookBreakdown.php
- Add Login form link action hook in index.php & Actions.php
- SQL fix Report Card Grades insert in rosariosis_fr.sql
- SQL fix ORDER Report Cards by Student name & Course list by Title in ReportCards.fnc.php
- SQL fix error invalid input syntax for integer in DailySummary.php
- Replace tested on Ubuntu 16.04 with 18.04 (Buster) in INSTALL.md, INSTALL_es.md & INSTALL_fr.md

Changes in 7.5
--------------
- HTML fix Student Assignment Submission display in StudentAssignments.fnc.php
- Percent rounding to 2 decimal places is new School default in \_makeLetterGrade.fnc.php
- CSS Fix widefat table border color when rendered in PDF inside Chrome in colors.css
- Add phpwkhtmltopdf class & remove Wkhtmltopdf class in classes/
- Use phpwkhtmltopdf class instead of Wkhtmltopdf (more reliable & faster) in PDF.php
- Add Report Cards PDF footer action hook in ReportCards.fnc.php & Actions.php
- Transcripts PDF header action hook: echo your custom text before or append it to $header_html to display it after in Transcripts.fnc.php
- Transcripts PDF footer action hook: echo your custom text before or append it to $footer_html to display it after in Transcripts.fnc.php
- Add .transcript-certificate-block1 & .transcript-certificate-block2 CSS classes in Transcripts.fnc.php
- Add .report-card-free-text CSS class in ReportCards.fnc.php
- Delete any attendance for this day & student prior to update in FixDailyAttendance.php
- Use \_makeLetterGrade() for Percent grade so it reflects Teacher's Score rounding configuration in Grades.php & ProgressReports.php
- Fix Add Credits only for Report Cards in ReportCards.fnc.php
- Fix SQL error invalid input syntax for integer (Class Rank input) in Widgets.fnc.php
- HTML Grades GPA Widget: use number input & check Weighted by default in Widgets.fnc.php

Changes in 7.4
--------------
- List sort comment: trim & fix position in ListOutput.fnc.php
- Fix #303 Raw value in comment so we can sort Percent column the right way in Grades.php, thanks to @dd02
- Add Database Backup link to header in Rollover.php
- Add Course Widget configuration option: Popup window or Pull-Down in Configuration.php & Help_en.php
- Add Course Widget: select / Pull-Down in Widgets.fnc.php
- Update French & Spanish translations in rosariosis.po, help.po
- Add Total Credits in ReportCards.fnc.php
- Do not display "General Comments" title if no comments in ReportCards.fnc.php
- HTML display rows of 3 School Period checkboxes in AddAbsences.php
- Comment input maxlength increased to 500 in InputFinalGrades.php
- Comment Code input field is required in ReportCardCommentCodes.php
- Add php-zip extension to list in INSTALL.md
- Check for zip extension in diagnostic.php
- Fix SQL error integer out of range in Food_Service/Students/Accounts.php
- French translation: replace "Effacer" with "Supprimer" in rosariosis.po & help.po
- Fix Teacher Programs Progress Report PDF, do not echo form in TeacherPrograms.php

Changes in 7.3.1
----------------
- Fix admin override: no input div when values are not saved yet in Grades/Configuration.php
- Fix #304 Do not include Excused (`*` or -1) grades in GradebookBreakdown.php, thanks to @dd02
- Fix #304 regression since 5.0 Count students in GradebookBreakdown.php, thanks to @dd02
- Fix #304 Totals count exclude Extra Credit assignments when Total Points is 0 for the Type, thanks to @dd02

Changes in 7.3
--------------
- SQL Replace AND p.ATTENDANCE='Y' with AND cp.DOES_ATTENDANCE IS NOT NULL in Letters.php, StudentLabels.fnc.php, HonorRoll.fnc.php & Reminders.php
- SQL remove unused SELECT ROOM in HonorRoll.fnc.php
- Translate database on add-on install: run 'install_fr.sql' file in Modules.inc.php, Plugins.inc.php, modules/README.md & plugins/README.md
- CSS remove wildcard rules in stylesheet.css & wkhtmltopdf.css
- CSS remove browser input outline on focus in colors.css
- Fix Format Phone Number for US in GetStuList.fnc.php, thanks to @dzungdo
- Attendance dashboard limit Absences to past days in Dashboard.inc.php
- Fix #299 Remove trailing slash "/" or dash "-" or dot "." from date in DailySummary.php
- Fix #300 Include Full Day and Half Day school periods in the schedule table in PrintSchedules.php, thanks to @dzungdo
- Update translations complete % in locale/REFERENCE.md
- Add tested on CentOS & Google Chrome in INSTALL.md & INSTALL.pdf, thanks to @dd02
- Add Before First Login form action hook in index.php & Actions.php
- Fix regression since 7.0 not rolled items are checked in Rollover.php

Changes in 7.2.4
----------------
- Take in Account Calendar Day Minutes in UpdateAttendanceDaily.fnc.php
- Fix regression since 5.3 Return false if School Periods Length sum is 0 in UpdateAttendanceDaily.fnc.php, thanks to @dzungdo

Changes in 7.2.3
----------------
- Fix regression since 5.9 search text User Field in Search.fnc.php, thanks to @dzungdo

Changes in 7.2.2
----------------
- Fix SQL error foreign keys: Roll Schools before rolling Student Enrollment in Rollover.php
- Fix SQL error table address specified more than once in GetStuList.fnc.php

Changes in 7.2.1
----------------
- Fix ParseMLField for Username field category in Preferences.php
- Fix PHP Warning check requested locale exists in Warehouse.php
- Add Attendance Codes help for (Lunch) Categories in Help_en.php & help.po
- Fix SQL error multiple rows returned by a subquery in CreateParents.php

Changes in 7.2
--------------
- Add Grade Level breakdown in StudentFieldBreakdown.php
- Add link to Student Info in AddDrop.php
- Limit students to User schools in AddDrop.php
- Order Day, Month & Year inputs depending on User date preference in Date.php
- SQL fix only display enrolled students in AddStudents.php
- Link to Student Info redirects to right school in AddStudents.php
- Reset password variable for each Contact in CreateParents.php

Changes in 7.1.4
----------------
- Fix infinite loop when username already exists in CreateParents.php

Changes in 7.1.3
----------------
- Fix #297 regression since 6.9 & SQL error in StudentSummary.php

Changes in 7.1.2
----------------
- Fix SQL error Include Inactive Students for admin in PrintClassLists.php

Changes in 7.1.1
----------------
- Fix #296 Include Inactive Students for admin in PrintClassLists.php

Changes in 7.1
--------------
- Final Grading Percentages: add "No quarters found" error in Configuration.php
- Add Start Date input in Scheduler.php
- Export (Excel) date to YYYY-MM-DD format (ISO) in Date.php & Preferences.php
- Select Date Format: Add Preferences( 'DATE' ) in User.fnc.php, Preferences.php, Date.php & Side.php
- Fix SQL error TITLE column limit to 50 characters in GradeLevels.php
- HTML remove radio buttons (File Attached or Embed Link) in PortalNotes.php & PortalPollsNotes.fnc.php
- Add Grade Level breakdown in StudentBreakdown.php
- Include Credits in ReportCards.fnc.php

Changes in 7.0.4
----------------
- Fix #295 regression since 7.0 cannot save N/A date in Date.php

Changes in 7.0.3
----------------
- Fix Multiple School Periods: Course Period School Period does not match, skip in Scheduler.php

Changes in 7.0.2
----------------
- JS Fix search form onsubmit in Export.php

Changes in 7.0.1
----------------
- Fix #292 System error "blocked access to local file" with wkhtmltopdf 0.12.6 in Wkhtmltopdf.php

Changes in 7.0
--------------
- Update Markdownify from v2.1.11 to v2.3.1 in classes/Markdownify/*
- Update Parsedown from v1.6.0 to v1.7.4 in classes/Parsedown.php
- Update MoTranslator from v3.4 to v4.0 in Warehouse.php, Help.fnc.php & classes/MoTranslator/*
- Fix 'School' translation when using MoTranslator in Schedule.inc.php & rosariosis.po
- Fix '%s Handbook' translation when using MoTranslator in Help.php
- CSS fix align "+" New Event icon to bottom in Calendar.php, CalendarDay.inc.php, stylesheet.css & zreponsive.css
- Fix Day Number when multiple calendars and school years in CalendarDay.inc.php, DayToNumber.inc.php
- Fix Numbered days display in SchoolPeriodsSelectInput.fnc.php & Courses.fnc.php
- SQL improve Numbered days in AddAbsences.php, Administration.php, DailySummary.php, TakeAttendance.php, TeacherCompletion.php, UpdateAttendanceDaily.fnc.php & Portal.php
- Place Rollover under Utilities separator in Menu.php
- Merge Schedule Report & Master Schedule Report in Menu.php, MasterScheduleReport.php, ScheduleReport.php & rosariosis.sql
- Add Students column to report in RequestsReport.php
- Merge Requests Report & Unfilled Requests in Menu.php, RequestsReport.php, UnfilledRequests.php, Scheduler.php, Help_en.php & rosariosis.sql
- Merge Average Daily Attendance & Average Attendance by Day in Menu.php, Percent.php, Help_en.php, help.po & rosariosis.sql
- Remove "Happy []..." text in Portal.php
- HTML remove "Demographics" header to gain space on PDF in AttendanceSummary.php
- SQL Update ATTENDANCE_CODE (admin) when is NULL in TakeAttendance.php
- CSS Add .widefat.files class in StudentsUsersInfo.fnc.php & stylesheet.css
- CSS WPadmin more padding for list rows, menu links & footer help in stylesheet.css
- CSS FlatSIS less padding for list row, header & popTable in stylesheet.css
- CSS FlatSIS reduce body line-height & fix Dashboard tipmsg border in stylesheet.css
- Format "Show Available Seats" & "Print Schedule" headers in Schedule.php
- Remove $fy_id global variable in Schedule.php
- HTML Add tooltips & notes in Rollover.php
- Fix current CP Marking Period check on update in Courses.php
- Fix limit list results to 1000, do not remove 1st result in ListOutput.fnc.php
- Add $RosarioErrorsAddress config variable in config.inc.sample.php
- Fix $RosarioNotifyAddress config variable description in INSTALL.md, INSTALL_es.md & INSTALL_fr.md
- SQL no access to Custom "My Report" program for admin by default in rosariosis.sql
- JS MarkdownToHTML No MarkDown in text, return raw text in warehouse.js
- Fix Delete from other Student/User Info tabs in Student.php & User.php
- Remove deprecated since 4.5 rollover_* action hooks in Rollover.php & Actions.php
- Fix Error: There is no column for The value for 0. This value was not saved in SaveData.fnc.php
- Fix Do not Save / Export Medical tab lists in Medical.inc.php


### Old versions CHANGES
- [CHANGES for versions 5 and 6](CHANGES_V5_6.md).
- [CHANGES for versions 3 and 4](CHANGES_V3_4.md).
- [CHANGES for versions 1 and 2](CHANGES_V1_2.md).
