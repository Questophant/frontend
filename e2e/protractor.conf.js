const puppeteer = require('puppeteer');
process.env.CHROME_BIN = puppeteer.executablePath();

const { SpecReporter } = require('jasmine-spec-reporter');

/**
 * @type { import("protractor").Config }
 */
exports.config = {
	allScriptsTimeout: 11000,
	specs: ['./src/**/*.e2e-spec.ts'],
	capabilities: {
		browserName: 'chrome',
		chromeOptions: {
			args: ['--headless', '--no-sandbox'],
			binary: process.env.CHROME_BIN,
		},
	},
	directConnect: true,
	baseUrl: 'http://localhost:4200/',
	framework: 'jasmine',
	jasmineNodeOpts: {
		showColors: true,
		defaultTimeoutInterval: 30000,
		print: function () {},
	},
	onPrepare() {
		require('ts-node').register({
			project: require('path').join(__dirname, './tsconfig.json'),
		});
		jasmine
			.getEnv()
			.addReporter(
				new SpecReporter({ spec: { displayStacktrace: true } })
			);
	},
};
