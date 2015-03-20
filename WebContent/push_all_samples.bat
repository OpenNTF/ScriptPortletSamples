@echo off
FOR /D %%f IN (*) DO (
	echo pushing %%f
	rem set path to sp.bat in the following line or add that path to your environment variable:	
	call sp push -contentRoot %%f
)