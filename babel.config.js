module.exports = {
    presets: [
        ["@babel/preset-env", {targets: { node: "current" }}],
        "@babel/preset-typescript",
    ],
    plugins: [
        [
            "module-resolver",
            {
                alias: {
                    "@modules": "./src/modules",
                    "@errors": "./src/errors",
                    "@shared": "./src/shared",
                    "@utils": "./src/utils",
                    "@config": "./src/config"
                }
            }
        ],
            "babel-plugin-transform-typescript-metadata",
            ["@babel/plugin-proposal-decorators", { "legacy": true }],
            ["@babel/plugin-proposal-class-properties", { "loose": true }],
    ]

}