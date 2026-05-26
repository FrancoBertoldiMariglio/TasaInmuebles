const { withXcodeProject } = require('@expo/config-plugins');

/**
 * Disables ENABLE_USER_SCRIPT_SANDBOXING for all targets/configs.
 *
 * Why: Xcode 26+ sandbox blocks Expo's "Bundle React Native code and
 * images" script from writing ip.txt into the .app bundle (used for
 * Hot Reload dev server discovery). Without this, iOS builds fail with
 * "Sandbox: bash deny file-write-data" on device.
 *
 * Without this plugin, the setting is reset every time `expo prebuild`
 * regenerates the ios/ folder (which is gitignored).
 */
const withDisableScriptSandbox = (config) =>
  withXcodeProject(config, (cfg) => {
    const project = cfg.modResults;
    const configurations = project.pbxXCBuildConfigurationSection();
    Object.keys(configurations).forEach((key) => {
      const buildSettings = configurations[key]?.buildSettings;
      if (buildSettings && typeof buildSettings === 'object') {
        buildSettings.ENABLE_USER_SCRIPT_SANDBOXING = 'NO';
      }
    });
    return cfg;
  });

module.exports = withDisableScriptSandbox;
