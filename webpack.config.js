// importamos la libreria path para manipular rutas facilmente
const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin'); // Require  html-webpack-plugin plugin


// webpack.config.js exporta un objeto con la configuracion
module.exports = {
    // configuracion general
    // ================================================================================================
    mode: 'development', // development | production -> especifica si se realizan o no optimizaciones
    entry: {
        common: './src/js/common.js',
        settings: './src/js/settings.js',
        dashboard: './src/js/dashboard.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'), // carpeta donde pondremos la build
        filename: 'js/[name].js', // nombre del fichero empaquetado
    },

    // configuracion modulos (loaders, parsers, etc.)
    // ================================================================================================
    module: {
        // el objeto rules contiene expresiones regulares. Si el fichero a importar cumple la expresion,
        // se utilizan los modulos especificados en esa regla
        rules: [
            {
                test: /\.html$/i,
                loader: 'html-loader',
            },
            {
                test: /\.(js|jsx)$/, // los ficheros .js y .jsx activan esta regla
                exclude: /node_modules/, // excepto los ficheros en node_modules
                use: {
                    loader: "babel-loader", // los ficheros seran procesados por babel
                },
            },
            {
                test: /\.(scss|css)$/, // los ficheros .scss y .css activan esta regla
                use: [
                    // 4. crea un bundle de todos los ficheros .css (eliminar si usamos style-loader ya
                    // que lo cargariamos enlazandolo en index.html)
                    MiniCssExtractPlugin.loader,  

                    //'style-loader',     // 4. aplica los estilos (eliminar si usamos MiniCssExtractPlugin)
                    'css-loader',       // 3. convierte los ficheros css a imports de JS
                    'postcss-loader',   // 2. Autoprefixer para añadir prefijos por compatibilidad
                    'sass-loader',      // 1. transpila de scss a css
                ],
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                loader: 'file-loader',
                options: {
                    name: 'css/images/[name].[ext]'
                }
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                loader: 'file-loader',
                options: {
                    name: '/fonts/[name].[ext]'
                }
            },
        ]
    },
    plugins: [ 
        new HtmlWebpackPlugin({
            filename: 'settings.html',
            template: 'src/public/settings.html',
            chunks: ['common', 'settings']
        }),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'src/public/dashboard.html',
            chunks: ['common', 'dashboard']
        }),
        new MiniCssExtractPlugin({
            filename: 'css/[name].css',
        }),
    ]
}

// mas documentacion: https://webpack.js.org/configuration/