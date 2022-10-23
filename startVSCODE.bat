
set NODE_VERSION=16
@call "SetDevEnv.bat"

start %VSCODE_HOME%\code.exe --extensions-dir %TOOLS_HOME%\VSCode\extensions --user-data-dir %TOOLS_HOME%\VSCode\user-data %WORKSPACE_HOME%\generator
