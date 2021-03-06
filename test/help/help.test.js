'use strict';

const stripAnsi = require('strip-ansi');
const { bold, enabled: coloretteEnabled } = require('colorette');
const { run, isWebpack5 } = require('../utils/test-utils');

const helpDefaultHeader = 'The build tool for modern web applications.';

describe('help', () => {
    it('should show help information using the "--help" option', () => {
        const { exitCode, stderr, stdout } = run(__dirname, ['--help']);

        expect(exitCode).toBe(0);
        expect(stderr).toBeFalsy();

        const pureStdout = stripAnsi(stdout);

        expect(pureStdout).toContain('webpack [entries...] [options]');
        expect(pureStdout).toContain('webpack [command] [options]');
        expect(pureStdout).toContain(helpDefaultHeader);
        expect(pureStdout).toContain('Options:');
        expect(pureStdout).toContain('--merge'); // minimum
        expect(pureStdout).not.toContain('--cache-type'); // verbose
        expect(pureStdout).toContain('Global options:');
        expect(pureStdout).toContain('Commands:');
        expect(pureStdout.match(/build\|bundle\|b/g)).toHaveLength(1);
        expect(pureStdout.match(/watch\|w/g)).toHaveLength(1);
        expect(pureStdout.match(/version\|v/g)).toHaveLength(1);
        expect(pureStdout.match(/help\|h/g)).toHaveLength(1);
        expect(pureStdout.match(/serve\|s/g)).toHaveLength(1);
        expect(pureStdout.match(/info\|i/g)).toHaveLength(1);
        expect(pureStdout.match(/init\|c/g)).toHaveLength(1);
        expect(pureStdout.match(/loader\|l/g)).toHaveLength(1);
        expect(pureStdout.match(/plugin\|p/g)).toHaveLength(1);
        expect(pureStdout.match(/migrate\|m/g)).toHaveLength(1);
        expect(pureStdout.match(/configtest\|t/g)).toHaveLength(1);
        expect(pureStdout).toContain("To see list of all supported commands and options run 'webpack --help=verbose'.");
        expect(pureStdout).toContain('CLI documentation: https://webpack.js.org/api/cli/.');
        expect(pureStdout).toContain('Made with ♥ by the webpack team.');
    });

    it.skip('should show help information using the "--help" option with the "verbose" value', () => {
        const { exitCode, stderr, stdout } = run(__dirname, ['--help', 'verbose']);

        expect(exitCode).toBe(0);
        expect(stderr).toBeFalsy();

        const pureStdout = stripAnsi(stdout);

        expect(pureStdout).toContain('webpack [entries...] [options]');
        expect(pureStdout).toContain('webpack [command] [options]');
        expect(pureStdout).toContain(helpDefaultHeader);
        expect(pureStdout).toContain('Options:');
        expect(pureStdout).toContain('--merge'); // minimum

        if (isWebpack5) {
            expect(pureStdout).toContain('--cache-type'); // verbose
        }

        expect(pureStdout).toContain('Global options:');
        expect(pureStdout).toContain('Commands:');
        expect(pureStdout.match(/build\|bundle\|b/g)).toHaveLength(1);
        expect(pureStdout.match(/watch\|w/g)).toHaveLength(1);
        expect(pureStdout.match(/version\|v/g)).toHaveLength(1);
        expect(pureStdout.match(/help\|h/g)).toHaveLength(1);
        expect(pureStdout.match(/serve\|s/g)).toHaveLength(1);
        expect(pureStdout.match(/info\|i/g)).toHaveLength(1);
        expect(pureStdout.match(/init\|c/g)).toHaveLength(1);
        expect(pureStdout.match(/loader\|l/g)).toHaveLength(1);
        expect(pureStdout.match(/plugin\|p/g)).toHaveLength(1);
        expect(pureStdout.match(/migrate\|m/g)).toHaveLength(1);
        expect(pureStdout).toContain("To see list of all supported commands and options run 'webpack --help=verbose'.");
        expect(pureStdout).toContain('CLI documentation: https://webpack.js.org/api/cli/.');
        expect(pureStdout).toContain('Made with ♥ by the webpack team.');
    });

    it.skip('should show help information using the "--help" option with the "verbose" value #2', () => {
        const { exitCode, stderr, stdout } = run(__dirname, ['--help=verbose']);

        expect(exitCode).toBe(0);
        expect(stderr).toBeFalsy();

        const pureStdout = stripAnsi(stdout);

        expect(pureStdout).toContain('webpack [entries...] [options]');
        expect(pureStdout).toContain('webpack [command] [options]');
        expect(pureStdout).toContain(helpDefaultHeader);
        expect(pureStdout).toContain('Options:');
        expect(pureStdout).toContain('--merge'); // minimum

        if (isWebpack5) {
            expect(pureStdout).toContain('--cache-type'); // verbose
        }

        expect(pureStdout).toContain('Global options:');
        expect(pureStdout).toContain('Commands:');
        expect(pureStdout).toContain("To see list of all supported commands and options run 'webpack --help=verbose'.");
        expect(pureStdout).toContain('CLI documentation: https://webpack.js.org/api/cli/.');
        expect(coloretteEnabled ? stripAnsi(stdout) : stdout).toContain('Made with ♥ by the webpack team.');
    });

    it('should show help information using command syntax', () => {
        const { exitCode, stderr, stdout } = run(__dirname, ['help']);

        expect(exitCode).toBe(0);
        expect(stderr).toBeFalsy();

        const pureStdout = stripAnsi(stdout);

        expect(pureStdout).toContain('webpack [entries...] [options]');
        expect(pureStdout).toContain('webpack [command] [options]');
        expect(pureStdout).toContain(helpDefaultHeader);
        expect(pureStdout).toContain('Options:');
        expect(pureStdout).toContain('--merge'); // minimum
        expect(pureStdout).not.toContain('--cache-type'); // verbose
        expect(pureStdout).toContain('Global options:');
        expect(pureStdout).toContain('Commands:');
        expect(pureStdout).toContain("To see list of all supported commands and options run 'webpack --help=verbose'.");
        expect(pureStdout).toContain('CLI documentation: https://webpack.js.org/api/cli/.');
        // TODO buggy on windows
        // expect(coloretteEnabled ? stripAnsi(stdout) : stdout).toContain('Made with ♥ by the webpack team.');
    });

    it('should show the same information using the "--help" option and command syntax', () => {
        const { exitCode: exitCodeFromOption, stderr: stderrFromOption, stdout: stdoutFromOption } = run(__dirname, ['--help']);
        const { exitCode: exitCodeFromCommandSyntax, stderr: stderrFromCommandSyntax, stdout: stdoutFromCommandSyntax } = run(__dirname, [
            'help',
        ]);

        expect(exitCodeFromOption).toBe(0);
        expect(exitCodeFromCommandSyntax).toBe(0);
        expect(stderrFromOption).toBeFalsy();
        expect(stderrFromCommandSyntax).toBeFalsy();
        expect(stdoutFromOption).toBe(stdoutFromCommandSyntax);
    });

    it('should show help information and respect the "--color" flag using the "--help" option', () => {
        const { exitCode, stderr, stdout } = run(__dirname, ['--help', '--color']);

        expect(exitCode).toBe(0);
        expect(stderr).toBeFalsy();

        const pureStdout = stripAnsi(stdout);

        expect(pureStdout).toContain('webpack [entries...] [options]');
        expect(pureStdout).toContain('webpack [command] [options]');
        expect(pureStdout).toContain(helpDefaultHeader);
        expect(pureStdout).toContain('Options:');
        expect(pureStdout).toContain('--merge'); // minimum
        expect(pureStdout).not.toContain('--cache-type'); // verbose
        expect(pureStdout).toContain('Global options:');
        expect(pureStdout).toContain('Commands:');
        expect(pureStdout).toContain("To see list of all supported commands and options run 'webpack --help=verbose'.");
        expect(pureStdout).toContain('CLI documentation: https://webpack.js.org/api/cli/.');
        expect(pureStdout).toContain(coloretteEnabled ? bold('Made with ♥ by the webpack team') : 'Made with ♥ by the webpack team');
    });

    it('should show help information and respect the "--no-color" flag using the "--help" option', () => {
        const { exitCode, stderr, stdout } = run(__dirname, ['--help', '--no-color']);

        expect(exitCode).toBe(0);
        expect(stderr).toBeFalsy();

        const pureStdout = stripAnsi(stdout);

        expect(pureStdout).toContain('webpack [entries...] [options]');
        expect(pureStdout).toContain('webpack [command] [options]');
        expect(pureStdout).toContain(helpDefaultHeader);
        expect(pureStdout).toContain('Options:');
        expect(pureStdout).toContain('--merge'); // minimum
        expect(pureStdout).not.toContain('--cache-type'); // verbose
        expect(pureStdout).toContain('Global options:');
        expect(pureStdout).toContain('Commands:');
        expect(pureStdout).toContain("To see list of all supported commands and options run 'webpack --help=verbose'.");
        expect(pureStdout).toContain('CLI documentation: https://webpack.js.org/api/cli/.');
        // TODO bug in tests
        // expect(stdout).not.toContain(bold('Made with ♥ by the webpack team'));
        expect(pureStdout).toContain('Made with ♥ by the webpack team');
    });

    const commands = [
        'build',
        'bundle',
        'b',
        'watch',
        'w',
        'serve',
        's',
        'info',
        'i',
        'init',
        'c',
        'loader',
        'l',
        'plugin',
        'p',
        'configtest',
        't',
        'migrate',
        'm',
    ];

    commands.forEach((command) => {
        it(`should show help information for '${command}' command using the "--help" option`, () => {
            const { exitCode, stderr, stdout } = run(__dirname, [command, '--help']);

            expect(exitCode).toBe(0);
            expect(stderr).toBeFalsy();
            expect(stdout).toContain(`webpack ${command === 'build' || command === 'bundle' || command === 'b' ? '' : command}`);
        });

        it(`should show help information for '${command}' command using command syntax`, () => {
            const { exitCode, stderr, stdout } = run(__dirname, ['help', command]);

            expect(exitCode).toBe(0);
            expect(stderr).toBeFalsy();
            expect(stdout).toContain(`webpack ${command === 'build' || command === 'bundle' || command === 'b' ? '' : command}`);
        });

        it('should show help information and respect the "--color" flag using the "--help" option', () => {
            const { exitCode, stderr, stdout } = run(__dirname, [command, '--help', '--color']);

            expect(exitCode).toBe(0);
            expect(stderr).toBeFalsy();
            expect(stdout).toContain(`webpack ${command === 'build' || command === 'bundle' || command === 'b' ? '' : command}`);
            expect(stdout).toContain(coloretteEnabled ? bold('Made with ♥ by the webpack team') : 'Made with ♥ by the webpack team');
        });

        it('should show help information and respect the "--no-color" flag using the "--help" option', () => {
            const { exitCode, stderr, stdout } = run(__dirname, [command, '--help', '--no-color']);

            expect(exitCode).toBe(0);
            expect(stderr).toBeFalsy();
            expect(stdout).toContain(`webpack ${command === 'build' || command === 'bundle' || command === 'b' ? '' : command}`);
            // TODO bug in tests
            // expect(stdout).not.toContain(bold('Made with ♥ by the webpack team'));
            expect(stdout).toContain('Made with ♥ by the webpack team');
        });
    });

    it('should show help information with options for sub commands', () => {
        const { exitCode, stderr, stdout } = run(__dirname, ['info', '--help']);

        expect(exitCode).toBe(0);
        expect(stderr).toBeFalsy();

        const pureStdout = stripAnsi(stdout);

        expect(pureStdout).toContain('webpack info|i [options]');
        expect(pureStdout).toContain('Options:');
        expect(pureStdout).toContain('--output <value>');
        expect(pureStdout).toContain("To see list of all supported commands and options run 'webpack --help=verbose'.");
        expect(pureStdout).toContain('CLI documentation: https://webpack.js.org/api/cli/.');
        expect(pureStdout).toContain('Made with ♥ by the webpack team');
    });

    it('should show help information and taking precedence when "--help" and "--version" option using together', () => {
        const { exitCode, stderr, stdout } = run(__dirname, ['--help', '--version']);

        expect(exitCode).toBe(0);
        expect(stderr).toBeFalsy();

        const pureStdout = stripAnsi(stdout);

        expect(pureStdout).toContain('webpack [entries...] [options]');
        expect(pureStdout).toContain('webpack [command] [options]');
        expect(pureStdout).toContain(helpDefaultHeader);
        expect(pureStdout).toContain('Options:');
        expect(pureStdout).toContain('--merge'); // minimum
        expect(pureStdout).not.toContain('--cache-type'); // verbose
        expect(pureStdout).toContain('Global options:');
        expect(pureStdout).toContain('Commands:');
        expect(pureStdout).toContain("To see list of all supported commands and options run 'webpack --help=verbose'.");
        expect(pureStdout).toContain('CLI documentation: https://webpack.js.org/api/cli/.');
        // TODO buggy on windows
        // expect(coloretteEnabled ? stripAnsi(stdout) : stdout).toContain('Made with ♥ by the webpack team.');
    });

    it('should show help information using the "help --mode" option', () => {
        const { exitCode, stderr, stdout } = run(__dirname, ['help', '--mode']);

        expect(exitCode).toBe(0);
        expect(stderr).toBeFalsy();

        const pureStdout = stripAnsi(stdout);

        expect(pureStdout).toContain('Usage: webpack --mode <value>');
        expect(pureStdout).toContain('Description: Defines the mode to pass to webpack.');
        expect(pureStdout).toContain("To see list of all supported commands and options run 'webpack --help=verbose'.");
        expect(pureStdout).toContain('CLI documentation: https://webpack.js.org/api/cli/.');
    });

    it('should show help information using the "help --target" option', () => {
        const { exitCode, stderr, stdout } = run(__dirname, ['help', '--target']);

        expect(exitCode).toBe(0);
        expect(stderr).toBeFalsy();

        const pureStdout = stripAnsi(stdout);

        if (isWebpack5) {
            expect(pureStdout).toContain('Usage: webpack --target <value...>');
            expect(pureStdout).toContain('Short: webpack -t <value...>');
        } else {
            expect(pureStdout).toContain('Usage: webpack --target <value>');
            expect(pureStdout).toContain('Short: webpack -t <value>');
        }

        expect(pureStdout).toContain('Description: Sets the build target e.g. node.');
        expect(pureStdout).toContain("To see list of all supported commands and options run 'webpack --help=verbose'.");
        expect(pureStdout).toContain('CLI documentation: https://webpack.js.org/api/cli/.');
    });

    it('should show help information using the "help --stats" option', () => {
        const { exitCode, stderr, stdout } = run(__dirname, ['help', '--stats']);

        expect(exitCode).toBe(0);
        expect(stderr).toBeFalsy();

        const pureStdout = stripAnsi(stdout);

        expect(pureStdout).toContain('Usage: webpack --stats [value]');
        expect(pureStdout).toContain('Description: It instructs webpack on how to treat the stats e.g. verbose.');
        expect(pureStdout).toContain("To see list of all supported commands and options run 'webpack --help=verbose'.");
        expect(pureStdout).toContain('CLI documentation: https://webpack.js.org/api/cli/.');
    });

    it('should show help information using the "help --no-stats" option', () => {
        const { exitCode, stderr, stdout } = run(__dirname, ['help', '--no-stats']);

        expect(exitCode).toBe(0);
        expect(stderr).toBeFalsy();

        const pureStdout = stripAnsi(stdout);

        expect(pureStdout).toContain('Usage: webpack --no-stats');
        expect(pureStdout).toContain('Description: Disable stats output.');
        expect(pureStdout).toContain("To see list of all supported commands and options run 'webpack --help=verbose'.");
        expect(pureStdout).toContain('CLI documentation: https://webpack.js.org/api/cli/.');
    });

    it('should show help information using the "help --mode" option', () => {
        const { exitCode, stderr, stdout } = run(__dirname, ['help', '--mode']);

        expect(exitCode).toBe(0);
        expect(stderr).toBeFalsy();

        const pureStdout = stripAnsi(stdout);

        expect(pureStdout).toContain('Usage: webpack --mode <value>');
        expect(pureStdout).toContain('Description: Defines the mode to pass to webpack.');
        expect(pureStdout).toContain("To see list of all supported commands and options run 'webpack --help=verbose'.");
        expect(pureStdout).toContain('CLI documentation: https://webpack.js.org/api/cli/.');
    });

    it('should show help information using the "help serve --mode" option', () => {
        const { exitCode, stderr, stdout } = run(__dirname, ['help', 'serve', '--mode']);

        expect(exitCode).toBe(0);
        expect(stderr).toBeFalsy();

        const pureStdout = stripAnsi(stdout);

        expect(pureStdout).toContain('Usage: webpack serve --mode <value>');
        expect(pureStdout).toContain('Description: Defines the mode to pass to webpack.');
        expect(pureStdout).toContain("To see list of all supported commands and options run 'webpack --help=verbose'.");
        expect(pureStdout).toContain('CLI documentation: https://webpack.js.org/api/cli/.');
    });

    it('should show help information using the "help --color" option', () => {
        const { exitCode, stderr, stdout } = run(__dirname, ['help', '--color']);

        expect(exitCode).toBe(0);
        expect(stderr).toBeFalsy();

        const pureStdout = stripAnsi(stdout);

        expect(pureStdout).toContain('Usage: webpack --color');
        expect(pureStdout).toContain('Description: Enable colors on console.');
        expect(pureStdout).toContain("To see list of all supported commands and options run 'webpack --help=verbose'.");
        expect(pureStdout).toContain('CLI documentation: https://webpack.js.org/api/cli/.');
    });

    it('should show help information using the "help --no-color" option', () => {
        const { exitCode, stderr, stdout } = run(__dirname, ['help', '--no-color']);

        expect(exitCode).toBe(0);
        expect(stderr).toBeFalsy();

        const pureStdout = stripAnsi(stdout);

        expect(pureStdout).toContain('Usage: webpack --no-color');
        expect(pureStdout).toContain('Description: Disable colors on console.');
        expect(pureStdout).toContain("To see list of all supported commands and options run 'webpack --help=verbose'.");
        expect(pureStdout).toContain('CLI documentation: https://webpack.js.org/api/cli/.');
    });

    it('should show help information using the "help serve --color" option', () => {
        const { exitCode, stderr, stdout } = run(__dirname, ['help', 'serve', '--color']);

        expect(exitCode).toBe(0);
        expect(stderr).toBeFalsy();

        const pureStdout = stripAnsi(stdout);

        expect(pureStdout).toContain('Usage: webpack serve --color');
        expect(pureStdout).toContain('Description: Enable colors on console.');
        expect(pureStdout).toContain("To see list of all supported commands and options run 'webpack --help=verbose'.");
        expect(pureStdout).toContain('CLI documentation: https://webpack.js.org/api/cli/.');
    });

    it('should show help information using the "help serve --no-color" option', () => {
        const { exitCode, stderr, stdout } = run(__dirname, ['help', 'serve', '--no-color']);

        expect(exitCode).toBe(0);
        expect(stderr).toBeFalsy();
        expect(stdout).toContain('Usage: webpack serve --no-color');
        expect(stdout).toContain('Description: Disable colors on console.');
        expect(stdout).toContain("To see list of all supported commands and options run 'webpack --help=verbose'.");
        expect(stdout).toContain('CLI documentation: https://webpack.js.org/api/cli/.');
    });

    it('should show help information using the "help --version" option', () => {
        const { exitCode, stderr, stdout } = run(__dirname, ['help', '--version']);

        expect(exitCode).toBe(0);
        expect(stderr).toBeFalsy();

        const pureStdout = stripAnsi(stdout);

        expect(pureStdout).toContain('Usage: webpack --version');
        expect(pureStdout).toContain('Short: webpack -v');
        expect(pureStdout).toContain(
            "Description: Output the version number of 'webpack', 'webpack-cli' and 'webpack-dev-server' and commands.",
        );
        expect(pureStdout).toContain('CLI documentation: https://webpack.js.org/api/cli/.');
    });

    it('should show help information using the "help -v" option', () => {
        const { exitCode, stderr, stdout } = run(__dirname, ['help', '-v']);

        expect(exitCode).toBe(0);
        expect(stderr).toBeFalsy();

        const pureStdout = stripAnsi(stdout);

        expect(pureStdout).toContain('Usage: webpack --version');
        expect(pureStdout).toContain('Short: webpack -v');
        expect(pureStdout).toContain(
            "Description: Output the version number of 'webpack', 'webpack-cli' and 'webpack-dev-server' and commands.",
        );
        expect(pureStdout).toContain('CLI documentation: https://webpack.js.org/api/cli/.');
    });

    it('should log error for invalid command using the "--help" option', () => {
        const { exitCode, stderr, stdout } = run(__dirname, ['--help', 'myCommand']);

        expect(exitCode).toBe(2);
        expect(stderr).toContain("Unknown value for '--help' option, please use '--help=verbose'");
        expect(stdout).toBeFalsy();
    });

    it('should log error for invalid command using the "--help" option #2', () => {
        const { exitCode, stderr, stdout } = run(__dirname, ['--flag', '--help']);

        expect(exitCode).toBe(2);
        expect(stderr).toContain('Incorrect use of help');
        expect(stderr).toContain("Please use: 'webpack help [command] [option]' | 'webpack [command] --help'");
        expect(stderr).toContain("Run 'webpack --help' to see available commands and options");
        expect(stdout).toBeFalsy();
    });

    it('should log error for invalid command using the "--help" option #3', () => {
        const { exitCode, stderr, stdout } = run(__dirname, ['serve', '--flag', '--help']);

        expect(exitCode).toBe(2);
        expect(stderr).toContain('Incorrect use of help');
        expect(stderr).toContain("Please use: 'webpack help [command] [option]' | 'webpack [command] --help'");
        expect(stderr).toContain("Run 'webpack --help' to see available commands and options");
        expect(stdout).toBeFalsy();
    });

    it('should log error for unknown command using command syntax', () => {
        const { exitCode, stderr, stdout } = run(__dirname, ['help', 'myCommand']);

        expect(exitCode).toBe(2);
        expect(stderr).toContain("Can't find and load command 'myCommand'");
        expect(stderr).toContain("Run 'webpack --help' to see available commands and options");
        expect(stdout).toBeFalsy();
    });

    it('should log error for unknown command using command syntax #2', () => {
        const { exitCode, stderr, stdout } = run(__dirname, ['help', 'verbose']);

        expect(exitCode).toBe(2);
        expect(stderr).toContain("Can't find and load command 'verbose'");
        expect(stderr).toContain("Run 'webpack --help' to see available commands and options");
        expect(stdout).toBeFalsy();
    });

    it('should log error for unknown option using command syntax #2', () => {
        const { exitCode, stderr, stdout } = run(__dirname, ['help', '--made']);

        expect(exitCode).toBe(2);
        expect(stderr).toContain("Unknown option '--made'");
        expect(stderr).toContain("Run 'webpack --help' to see available commands and options");
        expect(stdout).toBeFalsy();
    });

    it('should log error for unknown option using command syntax #3', () => {
        const { exitCode, stderr, stdout } = run(__dirname, ['help', 'serve', '--made']);

        expect(exitCode).toBe(2);
        expect(stderr).toContain("Unknown option '--made'");
        expect(stderr).toContain("Run 'webpack --help' to see available commands and options");
        expect(stdout).toBeFalsy();
    });

    it('should log error for unknown option using command syntax #4', () => {
        const { exitCode, stderr, stdout } = run(__dirname, ['help', 'bui', '--mode']);

        expect(exitCode).toBe(2);
        expect(stderr).toContain("Can't find and load command 'bui'");
        expect(stderr).toContain("Run 'webpack --help' to see available commands and options");
        expect(stdout).toBeFalsy();
    });

    it('should log error for invalid command using command syntax #3', () => {
        const { exitCode, stderr, stdout } = run(__dirname, ['help', '--mode', 'serve']);

        expect(exitCode).toBe(2);
        expect(stderr).toContain('Incorrect use of help');
        expect(stderr).toContain("Please use: 'webpack help [command] [option]' | 'webpack [command] --help'");
        expect(stderr).toContain("Run 'webpack --help' to see available commands and options");
        expect(stdout).toBeFalsy();
    });

    it('should log error for invalid command using command syntax #4', () => {
        const { exitCode, stderr, stdout } = run(__dirname, ['help', 'serve', '--mode', '--mode']);

        expect(exitCode).toBe(2);
        expect(stderr).toContain('Incorrect use of help');
        expect(stderr).toContain("Please use: 'webpack help [command] [option]' | 'webpack [command] --help'");
        expect(stderr).toContain("Run 'webpack --help' to see available commands and options");
        expect(stdout).toBeFalsy();
    });

    it('should log error for invalid flag with the "--help" option', () => {
        const { exitCode, stderr, stdout } = run(__dirname, ['--help', '--my-flag']);

        expect(exitCode).toBe(2);
        expect(stderr).toContain('Incorrect use of help');
        expect(stderr).toContain("Please use: 'webpack help [command] [option]' | 'webpack [command] --help'");
        expect(stderr).toContain("Run 'webpack --help' to see available commands and options");
        expect(stdout).toBeFalsy();
    });

    it('should log error for invalid flag with the "--help" option #2', () => {
        const { exitCode, stderr, stdout } = run(__dirname, ['--help', 'init', 'info']);

        expect(exitCode).toBe(2);
        expect(stderr).toContain("Unknown value for '--help' option, please use '--help=verbose'");
        expect(stdout).toBeFalsy();
    });
});
