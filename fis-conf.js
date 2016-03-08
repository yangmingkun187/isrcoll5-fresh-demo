fis.set('project.ignore',['node_modules/**', 'output/**', '.git/**', 'fis-conf.js','angular.min.js','jquery-1.11.1.min.js','jquery.nicescroll.min.js'])
fis.set('project.md5Connector ', '.');
fis.match('js/*.js', {
    useHash: true
    // optimizer: fis.plugin('uglify-js')
    // ,release:'/static/$0'
});
fis.match('::package', {
  postpackager: fis.plugin('loader', {
    allInOne: true
  })
});
fis.match('**.less',{
    useHash: true,
    parser: fis.plugin('less', {
        //fis-parser-less option
    }),
    rExt: '.css'
    // ,release:'/static/$0'
});
fis.match('**.{less,css}', {
    useHash: true,
    optimizer: fis.plugin('clean-css')
    // ,release:'/static/$0'
});
fis.match('*.html:css',{
    optimizer:fis.plugin('clean-css')
})
fis.match('**.png', {
    useHash: false,
    // release:'/static/$0'
});
fis.match('*.png', {
  // fis-optimizer-png-compressor 插件进行压缩，已内置
  optimizer: fis.plugin('png-compressor')
});
