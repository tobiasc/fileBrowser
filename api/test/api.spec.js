var request = require('supertest');
var assert = require('assert');

describe("Posting is easy to test with supertest", function (){

  it("Empty request yields error", function(done){
    request("http://localhost:8080")
      .post("/folder")
      .expect(500)
      .expect("Missing params!", done);
  });

  it("Non existing folder yields error", function(done){
    var data = {
        baseFolder: '/Users/tobiaschristen/Desktop/projects/fileBrowser',
        maxEntries: '10'
    };
    request("http://localhost:8080")
      .post("/folder")
      .send(data)
      .expect(500)
      .expect("Folder not found!", done);
  });

  it("Existing folder", function(done){
    var data = {
        baseFolder: '/Users/tobiaschristensen/Desktop/projects/fileBrowser',
        maxEntries: '10'
    };
    request("http://localhost:8080")
      .post("/folder")
      .send(data)
      .end(function(err, result) {
        assert.equal(result.body.length, 6);
        done();
    });
  });

  it("Existing folder using maxEntries", function(done){
    var data = {
        baseFolder: '/Users/tobiaschristensen/Desktop/projects/fileBrowser',
        maxEntries: '1'
    };
    request("http://localhost:8080")
      .post("/folder")
      .send(data)
      .end(function(err, result) {
        assert.equal(result.body.length, 1);
        done();
    });
  });
});
