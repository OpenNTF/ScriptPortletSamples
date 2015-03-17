@echo off
FOR /D %%f IN (*) DO (
	cd %%f
    IF EXIST index.html (

	echo pushing %%f
	rem set path to sp.bat in the following line or add that path to your environment variable:	
	call c:\files\script_portlet\1.3\sp_cmdln\sp push
    )
    cd ..
)