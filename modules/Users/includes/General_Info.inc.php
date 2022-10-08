<div class="general-info width-100p valign-top fixed-col">
    <div class="col-1">
<?php
$foto   =   '<div class="st photo">';
$foto  .=       '<div rowspan="fields">';

// IMAGE.
if ( AllowEdit() && ! isset( $_REQUEST['_ROSARIO_PDF'] ) ):

$foto  .=           '<a href="#" onclick="$(\'.user-photo-form,.user-photo\').toggle(); return false;">'.button( "add", "", "", "smaller" ) . '<span> '. _( 'User Photo' ).'</span></a><br />';
$foto  .=           '<div class="user-photo-form hide field">'.
                         FileInput(
                            'photo',
                            _( 'User Photo' ) . ' (.jpg, .png, .gif)',
                            'accept=".jpg,.jpeg,.png,.gif"'
                        ).
                    '</div>';
endif;
                    // @since 9.0 Fix Improper Access Control security issue: add random string to photo file name.
                    $picture_path = (array) glob( $UserPicturesPath . UserSyear() . '/' . UserStaffID() . '.*jpg' );

                    $picture_path = end( $picture_path );

                    if ( ! $picture_path
                        && ! empty( $staff['ROLLOVER_ID'] ) )
                    {
                        // Use Last Year's if Missing.
                        // @since 9.0 Fix Improper Access Control security issue: add random string to photo file name.
                        $picture_path = (array) glob( $UserPicturesPath . ( UserSyear() - 1 ) . '/' . $staff['ROLLOVER_ID'] . '.*jpg' );

                        $picture_path = end( $picture_path );
                    }

if ( $_REQUEST['staff_id'] !== 'new' && $picture_path ):
$foto  .=	        '<div class="field">
                        <img src="'. URLEscape( $picture_path ) .'" class="user-photo" alt="'.AttrEscape( _( 'User Photo' ) ).'" />
                     </div>';
endif;
// END IMAGE
$foto  .=       '</div>
            </div>';
echo $foto;
?>
        </div><!-- clossing call-1 tag -->
        <div class="call-2">
<?php
            $titles_array = [
                'Mr' => _( 'Mr' ),
                'Mrs' => _( 'Mrs' ),
                'Ms' => _( 'Ms' ),
                'Miss' => _( 'Miss' ),
                'Dr' => _( 'Dr' ),
            ];

            $suffixes_array = [
                'Jr' => _( 'Jr' ),
                'Sr' => _( 'Sr' ),
                'II' => _( 'II' ),
                'III' => _( 'III' ),
                'IV' => _( 'IV' ),
                'V' => _( 'V' ),
            ];

            $staff_title = isset( $staff['TITLE'] ) && isset( $titles_array[ $staff['TITLE'] ] ) ?
                $titles_array[ $staff['TITLE'] ] : '';

            $staff_suffix = isset( $staff['NAME_SUFFIX'] ) && isset( $suffixes_array[ $staff['NAME_SUFFIX'] ] ) ?
                $suffixes_array[ $staff['NAME_SUFFIX'] ] : '';

$info_html= '<div class="cellspacing-0">';
if ( AllowEdit() && ! isset( $_REQUEST['_ROSARIO_PDF'] ) )
{
	$div = false;
    $name_html ='<div class="st staff-name">';
    $name_html.=    '<div class="fields">
                        <div class="field">' .
                            SelectInput(
                                issetVal( $staff['TITLE'], '' ),
                                'staff[TITLE]',
                                _( 'Title' ),
                                $titles_array,
                                '',
                                '',
                                $div
                            ) .
                        '</div>
                     </div>';
    $name_html.=    '<div class="fields">
                        <div class="field">' .
                            TextInput(
                                issetVal( $staff['FIRST_NAME'], '' ),
                                'staff[FIRST_NAME]',
                                _( 'First Name' ),
                                'size=12 maxlength=50 required',
                                $div
                            ) .
                        '</div>
                        <div class="field">' .
                            TextInput(
                                issetVal( $staff['MIDDLE_NAME'], '' ),
                                'staff[MIDDLE_NAME]',
                                _( 'Middle Name' ),
                                'maxlength=50',
                                $div
                            ) .
                        '</div>
                        <div class="field">' .
                            TextInput(
                                issetVal( $staff['LAST_NAME'], '' ),
                                'staff[LAST_NAME]',
                                _( 'Last Name' ),
                                'size=12 maxlength=50 required',
                                $div
                            ) .
                        '</div>'.
                        '<div class="field">'.
                            SelectInput(
                                issetVal( $staff['NAME_SUFFIX'], '' ),
                                'staff[NAME_SUFFIX]',
                                _( 'Suffix' ),
                                $suffixes_array,
                                '',
                                '',
                                $div
                            ).
                        '</div>'.
                    '</div>';
    $name_html.='</div>';
    if ( $_REQUEST['staff_id'] === 'new'
        || ! empty( $_REQUEST['moodle_create_user'] ) )
    {
        $info_html .=$name_html;
    }
    else
    {
        $id = 'user_name';

        $info_html .= InputDivOnclick(
            $id,
            $name_html,
            $staff_title . ' ' . $staff['FIRST_NAME'] . ' ' .
            $staff['MIDDLE_NAME'] . ' ' . $staff['LAST_NAME'] . ' ' . $staff_suffix,
            FormatInputTitle( _( 'Name' ), $id )
        );
    }
}
else
{
    $info_html.= NoInput(
		trim( $staff_title . ' ' . $staff['FIRST_NAME'] . ' ' .
			$staff['MIDDLE_NAME'] . ' ' . $staff['LAST_NAME'] . ' ' . $staff_suffix ),
		_( 'Name' )
	);
}

$id_html = '';
if ( ! isset( $_REQUEST['staff_id'] )
	|| $_REQUEST['staff_id'] !== 'new' )
{
    $id_html =  '<div class="st staff-id">
                    <div class="fields">';
    $id_html .=         '<div class="field">'.
                            NoInput( $staff['STAFF_ID'], sprintf( _( '%s ID' ), Config( 'NAME' ) ) ).
                        '</div>'.
                        '<div class="field">'.
                            NoInput( $staff['ROLLOVER_ID'], sprintf( _( 'Last Year %s ID' ), Config( 'NAME' ) ) );
                        '</div>'.
                    '</div>
                 </div>';
}
    $acc_html = '<div class="st username">
                    <div class="fields">';
    $acc_html .=        '<div class="field">';
                            //FJ Moodle integrator
                            //username, password required

                            $required = ! empty( $_REQUEST['moodle_create_user'] ) || ! empty( $old_user_in_moodle ) || basename( $_SERVER['PHP_SELF'] ) == 'index.php';

    $acc_html .=            TextInput(
                                issetVal( $staff['USERNAME'], '' ),
                                'staff[USERNAME]',
                                _( 'Username' ),
                                'size=12 maxlength=100 autocomplete="off" ' . ( $required ? 'required' : '' ),
                                empty( $_REQUEST['moodle_create_user'] )
                            ).
                        '</div>';
    $acc_html .=        '<div class="field">'.
                            PasswordInput(
                                ( empty( $staff['PASSWORD'] ) || ! empty( $_REQUEST['moodle_create_user'] ) ? '' : str_repeat( '*', 8 ) ),
                                'staff[PASSWORD]',
                                _( 'Password' ) .
                                ( ! empty( $_REQUEST['moodle_create_user'] ) ?
                                    '<div class="tooltip"><i>' .
                                    _( 'The password must have at least 8 characters, at least 1 digit, at least 1 lower case letter, at least 1 upper case letter, at least 1 non-alphanumeric character' ) .
                                    // @since 5.9 Moodle creates user password if left empty.
                                    '. ' ._( 'Moodle will create a password and send an email to user if left empty.' ) .
                                    '</i></div>' :
                                    ''
                                ),
                                'maxlength="42" tabindex="2" strength' .
                                // @since 5.9 Moodle creates user password if left empty + Do not update Moodle user password.
                                ( basename( $_SERVER['PHP_SELF'] ) == 'index.php' ? ' required' : '' ),
                                empty( $_REQUEST['moodle_create_user'] )
                            ).
                        '</div>';
    $acc_html .=    '</div>
                  </div>';
    $lgn_html  = '<div class="st last-login">
                     <div class="fields">';
    $lgn_html .=        '<div class="field">';
                            if ( array_key_exists( 'LAST_LOGIN', $staff ) )
                            {
                                // Hide Last Login on Create Account and Add screens.
                                $lgn_html .= NoInput( makeLogin( issetVal( $staff['LAST_LOGIN'], '' ) ), _( 'Last Login' ) );
                            }
    $lgn_html .=        '</div>
                     </div>
                  </div>';
$info_html .= $id_html.$acc_html.$lgn_html;

if ( basename( $_SERVER['PHP_SELF'] ) != 'index.php' )
{
	$prmsn_html = '<hr />';

    $prmsn_html.= '<div class="st user-permission">';
    $prmsn_html.=   '<div class="fields">';
    $prmsn_html.=       '<div class="field">';

                            $profile_options = [
                                '' => _( '' ),
                                'admin' => _( 'Administrator' ),
                                'teacher' => _( 'Teacher' ),
                                'parent' => _( 'Parent' ),
                                'none' => _( 'No Access' ),
                            ];

                            $admin_user_profile_restriction = User( 'PROFILE' ) === 'admin'
                                && AllowEdit()
                                && ! AllowEdit( 'Users/User.php&category_id=1&user_profile' );

                            // User Profile restrictions.
                            if ( $admin_user_profile_restriction )
                            {
                                if ( $_REQUEST['staff_id'] !== 'new' )
                                {
                                    // Temporarily deactivate AllowEdit.
                                    $_ROSARIO['allow_edit'] = false;
                                }
                                else
                                {
                                    // Remove Administrator from profile options.
                                    $profile_options = [
                                        'teacher' => _( 'Teacher' ),
                                        'parent' => _( 'Parent' ),
                                        'none' => _( 'No Access' ),
                                    ];
                                }
                            }

                            $non_admin_user_profile_restriction = User( 'PROFILE' ) !== 'admin' && AllowEdit();

                            if ( $non_admin_user_profile_restriction )
                            {
                                // Temporarily deactivate AllowEdit.
                                $_ROSARIO['allow_edit'] = false;
                            }

	$prmsn_html.=           SelectInput(
                                issetVal( $staff['PROFILE'], '' ),
                                'staff[PROFILE]',
                                _( 'User Profile' ),
                                $profile_options,
                                false,
                                'required',
                                empty( $_REQUEST['moodle_create_user'] )
                            );

	$prmsn_html.=       '</div>';
    $prmsn_html.=       '<div class="field">';

                            if ( $staff['PROFILE'] !== 'none' )
                            {
                                // Permissions (not for "No Access" profile).
                                $permissions_options = [];

                                if ( $_REQUEST['staff_id'] !== 'new' )
                                {
                                    $permissions_RET = DBGet( "SELECT ID,TITLE
                                        FROM user_profiles
                                        WHERE PROFILE='" . $staff['PROFILE'] . "'
                                        ORDER BY ID" );

                                    $permissions_options[_( 'Custom' )] = _( 'Custom' );
                                    foreach ( (array) $permissions_RET as $permission )
                                    {
                                        $permissions_options[$permission['ID']] = _( $permission['TITLE'] );
                                    }
                                }
                                else
                                {
                                    $permissions_options[_( 'Default' )] = _( 'Default' );
                                }

                                $na = '';
                                $prmsn_html.= SelectInput(
                                    issetVal( $staff['PROFILE_ID'], '' ),
                                    'staff[PROFILE_ID]',
                                    _( 'Permissions' ),
                                    $permissions_options,
                                    $na
                                );

                                if ( User( 'PROFILE' ) === 'admin'
                                    && AllowEdit( 'Users/Exceptions.php' )
                                    && ! $staff['PROFILE_ID']
                                    && UserStaffID() )
                                {
                                    // Add link to User Permissions.
                                    $prmsn_html.= '<div class="field-link"><a href="Modules.php?modname=Users/Exceptions.php">' .
                                    _( 'User Permissions' ) . '</a></div>';
                                }
                            }

                            // User Profile restrictions.

                            if ( $_REQUEST['staff_id'] !== 'new'
                                && ( $admin_user_profile_restriction
                                    || $non_admin_user_profile_restriction ) )
                            {
                                // Reactivate AllowEdit.
                                $_ROSARIO['allow_edit'] = true;
                            }

	$prmsn_html.=       '</div>';
    $prmsn_html.=       '<div class="field">';

                            //FJ remove Schools for Parents

                            if ( $staff['PROFILE'] !== 'parent' )
                            {
                                $schools_RET = DBGet( "SELECT ID,TITLE
                                    FROM schools
                                    WHERE SYEAR='" . UserSyear() . "'
                                    ORDER BY TITLE" );

                                unset( $options );

                                if ( $schools_RET )
                                {
                                    $admin_schools_restriction = ( User( 'PROFILE' ) !== 'admin' && AllowEdit() )
                                        || ( User( 'PROFILE' ) === 'admin' && AllowEdit()
                                            && ! AllowEdit( 'Users/User.php&category_id=1&schools' ) );

                                    // Admin Schools restriction.
                                    if ( $admin_schools_restriction )
                                    {
                                        // Temporarily deactivate AllowEdit.
                                        $_ROSARIO['allow_edit'] = false;
                                    }

                                    $i = 0;

                                    $school_options = [];

                                    foreach ( (array) $schools_RET as $school )
                                    {
                                        $school_options[$school['ID']] = _( $school['TITLE'] );
                                    }

                                    $na = '';
                                    $prmsn_html.= SelectInput(
                                        issetVal( $staff['PROFILE_ID'], '' ),
                                        'staff[SCHOOLS]',
                                        _( 'Schools' ),
                                            $school_options,
                                        $na
                                    );


                                    /*$school_titles = [];

                                    foreach ( (array) $schools_RET as $school )
                                    {
                                        if ( $i % 2 === 0 )
                                        {
                                            $schools_html .= '</tr><tr class="st">';
                                        }

                                        $value = isset( $staff['SCHOOLS'] )
                                            && mb_strpos( $staff['SCHOOLS'], ',' . $school['ID'] . ',' ) !== false ? 'Y' : '';

                                        $schools_html .= '<td>' . CheckboxInput(
                                            $value,
                                            'staff[SCHOOLS][' . $school['ID'] . ']',
                                            $school['TITLE'],
                                            '',
                                            true,
                                            button( 'check' ),
                                            button( 'x' )
                                        ) . '&nbsp;</td>';

                                        if ( $value )
                                        {
                                            $school_titles[] = $school['TITLE'];
                                        }

                                        $i++;
                                    }*/

                                    //$prmsn_html.= '</div>';

                                    /*$id = 'schools';

                                    $title = FormatInputTitle( _( 'Schools' ), $id );

                                    if ( $_REQUEST['staff_id'] !== 'new'
                                        && AllowEdit() )
                                    {
                                        echo InputDivOnclick(
                                            $id,
                                            $schools_html . str_replace( '<br />', '', $title ),
                                            $school_titles ? implode( ', ', $school_titles ) : _( 'All Schools' ),
                                            $title
                                        );
                                    }
                                    elseif ( AllowEdit() )
                                    {
                                        echo $schools_html . str_replace( '<br />', '', $title );
                                    }

                                    // Admin Schools restriction.
                                    elseif ( $_REQUEST['staff_id'] === 'new'
                                        && $admin_schools_restriction )
                                    {
                                        // Assign new user to current school only.
                                        echo SchoolInfo( 'TITLE' ) . $title;
                                    }
                                    else
                                    {
                                        echo ( $school_titles ? implode( ', ', $school_titles ) : _( 'All Schools' ) ) .
                                            $title;
                                    }*/

                                    // Admin Schools restriction.
                                    if ( $admin_schools_restriction )
                                    {
                                        // Reactivate AllowEdit.
                                        $_ROSARIO['allow_edit'] = true;
                                    }
                                }

                                //echo SelectInput($staff['SCHOOL_ID'],'staff[SCHOOL_ID]','School',$options,'All Schools');
                            }

	$prmsn_html.=       '</div>';
    $prmsn_html.=   '</div>';
//    $prmsn_html.='</div>';
	$info_html .= $prmsn_html;
}
echo $info_html;
$_REQUEST['category_id'] = '1';
$separator = '<hr />';

require_once 'modules/Users/includes/Other_Info.inc.php';

// FJ create account.
if ( basename( $_SERVER['PHP_SELF'] ) === 'index.php' )
{
	$create_account_html = '<hr />';

    $create_account_html = '<div class="st create-account">';
    $create_account_html.=     '<div class="fields">';
	// Add Captcha.
    $create_account_html.=         '<div class="field">'. CaptchaInput( 'captcha' . rand( 100, 9999 ), _( 'Captcha' ) ).'</div>';

    $create_account_html.=     '</div>';
    $create_account_html.= '</div>';
//    echo $create_account_html;
	$info_html .= $create_account_html;
}
echo    '</div><!-- closing cellspacing-0 tag -->';
?>
    </div> <!-- clossing call-2 tag -->
</div> <!-- clossing general-info tag -->
