<?php

// Modules configuration, included in Configuration.php

// Core modules (packaged with RosarioSIS):
// Core modules cannot be deleted
$core_modules = array(
	'School_Setup',
	'Students',
	'Users',
	'Scheduling',
	'Grades',
	'Attendance',
	'Eligibility',
	'Discipline',
	'Accounting',
	'Student_Billing',
	'Food_Service',
	'State_Reports',
	'Resources',
	'Custom'
);

// Core modules that will generate errors if deactivated
$always_activated = array(
	'School_Setup',
	'Students',
	'Users',
	'Scheduling',
	'Grades',
	'Attendance'
);

$directories_bypass = array(
	'.',
	'..',
	'misc'
);


if($_REQUEST['modfunc']=='delete' && AllowEdit())
{
	if(DeletePrompt(_('Module')))
	{
		//verify if not in $always_activated & not in $core_modules but in $RosarioModules
		if (!in_array($_REQUEST['module'], $always_activated) && !in_array($_REQUEST['module'], $core_modules) && in_array($_REQUEST['module'], array_keys($RosarioModules)))
		{
			continue;
		}
		
		unset($_REQUEST['modfunc']);
		unset($_REQUEST['module']);
	}
}

if($_REQUEST['modfunc']=='deactivate' && AllowEdit())
{
	if(DeletePrompt(_('Module'),_('Deactivate')))
	{
		//verify if not in $always_activated  & activated
		if (!in_array($_REQUEST['module'], $always_activated) && in_array($_REQUEST['module'], array_keys($RosarioModules)) && $RosarioModules[$_REQUEST['module']] == true)
		{
			//update $RosarioModules
			$RosarioModules[$_REQUEST['module']] = false;
			
			//save $RosarioModules
			_saveRosarioModules($RosarioModules);
		}
		
		unset($_REQUEST['modfunc']);
		unset($_REQUEST['module']);
	}
}

if($_REQUEST['modfunc']=='activate' && AllowEdit())
{
	$update_RosarioModules = false;
	
	//verify not already in $RosarioModules
	if (!in_array($_REQUEST['module'], array_keys($RosarioModules)))
	{
		//verify directory exists
		if (is_dir('modules/'.$_REQUEST['module']))
		{
			//install module TODO
			
			$update_RosarioModules = true;
		}
	}
	//verify in $RosarioModules
	elseif ($RosarioModules[$_REQUEST['module']] == false)
	{
		$update_RosarioModules = true;
	}
	
	if ($update_RosarioModules)
	{
		//update $RosarioModules
		$RosarioModules[$_REQUEST['module']] = true;
		
		//save $RosarioModules
		_saveRosarioModules($RosarioModules);
	}
	
	unset($_REQUEST['modfunc']);
	unset($_REQUEST['module']);
}


if(empty($_REQUEST['modfunc']))
{
	
	$modules_RET = array('');
	foreach($RosarioModules as $module_title => $activated)
	{
		$THIS_RET = array();
		$THIS_RET['DELETE'] =  _makeDelete($module_title,$activated);
		$THIS_RET['TITLE'] = _(str_replace('_', ' ', $module_title));
		$THIS_RET['ACTIVATED'] = _makeActivated($activated);
		
		$modules_RET[] = $THIS_RET;
	}		
	
	// scan modules/ folder for uninstalled modules
	$directories_bypass_complete = array_merge($directories_bypass, array_keys($RosarioModules));

	$modules = scandir('modules/');
	foreach ($modules as $module_title)
	{
		//filter directories
		if (!in_array($module_title, $directories_bypass_complete) && is_dir('modules/'.$module_title))
		{
			$THIS_RET = array();
			$THIS_RET['DELETE'] =  _makeDelete($module_title);
			$THIS_RET['TITLE'] = _(str_replace('_', ' ', $module_title));
			$THIS_RET['ACTIVATED'] = _makeActivated(false);
		
			$modules_RET[] = $THIS_RET;
		}
	}

	$columns = array('DELETE'=>'','TITLE'=>_('Title'),'ACTIVATED'=>_('Activated'));
	
	unset($modules_RET[0]);
	
	ListOutput($modules_RET,$columns,'Module','Modules');
}

function _makeActivated($activated)
{	global $THIS_RET;
	
	if ($activated)
		$return = '<img src="assets/check_button.png" height="16" />';
	else
		$return = '<img src="assets/x_button.png" height="16" />';

	return $return;
}

function _makeDelete($module_title,$activated=null)
{	
	global $always_activated, $core_modules;
	
	$return = '';
	if (AllowEdit())
	{
		if ($activated)
		{
			if (!in_array($module_title, $always_activated))
			{
				$return = button('remove',_('Deactivate'),'"Modules.php?modname='.$_REQUEST['modname'].'&tab=modules&modfunc=deactivate&module='.$module_title.'"');
				
			}
		}
		else
		{
			$return = button('add',_('Activate'),'"Modules.php?modname='.$_REQUEST['modname'].'&tab=modules&modfunc=activate&module='.$module_title.'"');
			
			if (!in_array($module_title, $always_activated) && !in_array($module_title, $core_modules))
				$return .= '&nbsp;'.button('remove',_('Delete'),'"Modules.php?modname='.$_REQUEST['modname'].'&tab=modules&modfunc=delete&module='.$module_title.'"');
		}
	}
	return $return;
}

function _saveRosarioModules($RosarioModules)
{
	$MODULES = DBEscapeString(serialize($RosarioModules));
	
	DBQuery("UPDATE config SET config_value='".$MODULES."' WHERE title='MODULES'");
	
	return true;
}
?>
