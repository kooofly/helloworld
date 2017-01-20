module.exports = {
    "src_folders" : ["test/e2e"],
    "output_folder" : "e2ereports",
    "custom_commands_path" : "node_modules/nightwatch-helpers/commands",
    "custom_assertions_path" : "node_modules/nightwatch-helpers/assertions",
    "page_objects_path" : "",
    "globals_path" : "",

    "selenium" : {
        "start_process" : true,
        // "server_path" : "./bin/selenium-server-standalone-2.53.1.jar",
        "server_path" : "node_modules/selenium-server/lib/runner/selenium-server-standalone-3.0.1.jar",
        "log_path" : "",
        'host': '127.0.0.1',
        "port" : 4444,
        "cli_args" : {
            // "webdriver.chrome.driver" : require('chromedriver').path,
            "webdriver.chrome.driver" : './bin/2.9/chromedriver.exe',
            "webdriver.gecko.driver" : "./bin/geckodriver.exe",
            "webdriver.edge.driver" : "bin/MicrosoftWebDriver.exe"
        }
    },

    "test_settings" : {
        "default" : {
            // "default_path_prefix" : "",
            "launch_url" : "http://localhost",
            "selenium_port"  : 4444, // 9515
            "selenium_host"  : "localhost",
            "silent": true,
            "screenshots" : {
                "enabled" : true,
                'on_failure': true,
                'on_error': false,
                "path" : "e2ereports/screenshots"
            },
            "desiredCapabilities": {
                "browserName": "chrome",
                'javascriptEnabled': true,
                'acceptSslCerts': true
            }
        },
        'ie': {
            "desiredCapabilities": {
                "browserName": "InternetExplorer",
                "acceptSslCerts": true,
                'javascriptEnabled': true,
                'marionette': true
            }
        },
        'edge': {
            "desiredCapabilities": {
                "browserName": "MicrosoftEdge",
                "acceptSslCerts": true,
                'javascriptEnabled': true,
                'marionette': true
            }
        },
        'firefox': {
            'desiredCapabilities': {
                'browserName': 'firefox',
                'javascriptEnabled': true,
                'acceptSslCerts': true,
                'marionette': true
            }
        },
        "chrome" : {
            "desiredCapabilities": {
                "browserName": "chrome",
                'javascriptEnabled': true,
                'acceptSslCerts': true
            }
        },
        'phantomjs': {
            'desiredCapabilities': {
                'browserName': 'phantomjs',
                'javascriptEnabled': true,
                'acceptSslCerts': true
            }
        }

    }
}