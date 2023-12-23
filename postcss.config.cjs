module.exports = {
  plugins: {
    tailwindcss: {
      config: path.join(__dirname, "tailwind.config.js"),
    },
    autoprefixer: {
      browsers: ["> 1%", "last 2 versions", "not ie <= 8"],
    },
  },
};
