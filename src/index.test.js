import {expect} from 'chai';
import jsdom from 'jsdom';
import fs from 'fs';

/* eslint-disable no-console */

describe('Our first test', () => {
    it('should pass', () => {
        expect(true).to.equal(true);
    });
});

describe("index.html", () => {
    it("should have h1 that says Users", (done) => {
        const index = fs.readFileSync('./src/index.html', "utf-8");
        jsdom.env(index, function(err, window){
            if (err != null){
                console.log(err);
            } else{
                const h1 = window.document.getElementsByTagName('h1')[0];
                expect(h1.innerHTML).to.equal("Users");
                done();
                window.close();
            }

        })//callback
    })
})
