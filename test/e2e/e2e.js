module.exports = {
    'hello': function (browser) {
        /*browser.url('http://localhost:8080/example/hello', function(result) {
            console.log(result);
        });*/
        browser
            .url('http://localhost:8080/example/hello')
            .waitForElementVisible('#hello', 1000)
            .click('#hello')
            .assert.hasHTML('#hello-v', '<h1 id="hello">hello</h1>')
            .end()
    }
}
