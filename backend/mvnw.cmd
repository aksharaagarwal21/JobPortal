@REM ----------------------------------------------------------------------------
@REM Maven Wrapper script for Windows
@REM ----------------------------------------------------------------------------

@echo off
setlocal

set MAVEN_PROJECTBASEDIR=%~dp0
set MAVEN_WRAPPER_JAR=%MAVEN_PROJECTBASEDIR%.mvn\wrapper\maven-wrapper.jar
set MAVEN_WRAPPER_PROPERTIES=%MAVEN_PROJECTBASEDIR%.mvn\wrapper\maven-wrapper.properties

@REM Check for JAVA_HOME
if defined JAVA_HOME goto javaHomeSet

@REM Try to use java from PATH
where java >nul 2>nul
if %ERRORLEVEL% == 0 (
    set JAVA_EXE=java
    goto execWrapper
)
echo Error: JAVA_HOME is not set and java is not in PATH.
goto error

:javaHomeSet
set JAVA_EXE=%JAVA_HOME%\bin\java.exe
if exist "%JAVA_EXE%" goto execWrapper
echo Error: JAVA_HOME is set to an invalid directory: %JAVA_HOME%
goto error

:execWrapper
@REM Download maven-wrapper.jar if not present
if exist "%MAVEN_WRAPPER_JAR%" goto runWrapper

echo Downloading Maven Wrapper...
for /F "usebackq tokens=2 delims==" %%A in (`findstr /R "wrapperUrl" "%MAVEN_WRAPPER_PROPERTIES%"`) do set WRAPPER_URL=%%A
powershell -Command "Invoke-WebRequest -Uri '%WRAPPER_URL%' -OutFile '%MAVEN_WRAPPER_JAR%'"
if errorlevel 1 goto error

:runWrapper
"%JAVA_EXE%" --enable-native-access=ALL-UNNAMED -Dmaven.multiModuleProjectDirectory="%MAVEN_PROJECTBASEDIR:~0,-1%" -classpath "%MAVEN_WRAPPER_JAR%" org.apache.maven.wrapper.MavenWrapperMain %*

if ERRORLEVEL 1 goto error
goto end

:error
set ERROR_CODE=1

:end
exit /b %ERROR_CODE%
