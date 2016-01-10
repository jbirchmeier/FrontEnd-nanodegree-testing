$(function() {
    //test that all feeds exists, is not empty and that entries have a title/URL
    describe('RSS Feeds', function() {
        //all feeds exists and is not empty
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        //ensure each entry has a title that is not empty
        it('has URL', function() {
            for(i=0; i < allFeeds.length; i++) {
                expect(allFeeds[i].url).toBeDefined();
                expect(allFeeds[i].url.length).not.toBe(0);
            }
        });

        //ensure each entry has a title that is not empty
        var i;
        it('has a name', function() {
            for(i=0; i < allFeeds.length; i++) {
                expect(allFeeds[i].name).toBeDefined();
                expect(allFeeds[i].name.length).not.toBe(0);
            }
        });
    });

    /* Test that the menu is hidded or displayed as necessary*/
    describe('The menu', function() {
         //menu is hidden my default when launching the app
        it('is hidden by default', function() {
            expect($('body').hasClass('menu-hidden')).toBe(true);
         });
        //menu is hidded or displayed when menu button is clicked
        it('is hidden or displayed', function() {
            var menu = $('.menu-icon-link');
            var body = $('body');

            menu.click();
            expect(body.hasClass('menu-hidden')).toBe(false);

            menu.click();
            expect(body.hasClass('menu-hidden')).toBe(true);
        });
    });

    /* Test that the first feed has at least one entry when the page loads*/
    describe('Initial Entries', function() {
        beforeEach(function(done){
            loadFeed(0, done);
        });

        it('should grab initial entries', function() {
            var entries = $('.entry');
            expect(entries.length).toBeGreaterThan(0);
        });
    });
    /* Test that when a feed is changed, that the entries appear and change with it*/
    describe('New Feed Selection', function() {
        var entry1, entry2;
        beforeEach(function(done){
            $('.feed').empty();

            loadFeed(0, function() {
                entry1 = $('.entry').find('h2').text();
                loadFeed(1, function() {
                    entry2 = $('.entry').find('h2').text();  
                    done();
                });
            });
         });

        it('should load new feed', function(done) {
            expect(entry1).not.toEqual(entry2);
            done();
        });
         
    });
     
}());
