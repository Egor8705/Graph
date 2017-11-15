const log = require("../lib/log")(module);
    
module.exports = (db) => {
    
    function getLines(req, res){
        db.any("SELECT * FROM lines",[true])
        .then(function (data) {
            res.json({lines:data});
        })
        .catch(function (err) {
            res.send(err);
        });   
    };

    function addLine(req, res){
        db.any(`INSERT INTO lines (start,finish) VALUES (${req.body.start},${req.body.finish}) RETURNING id`,[true])
        .then((data) => {
            res.json({
                id:     data[0].id,
                start:  req.body.start,
                finish: req.body.finish
            });
        })
        .catch((err) => {
            res.send(err);
        });
    };

    function deleteLine(req, res){
        let arrayIDs = ``;
        req.body.id.forEach((id,index) => {
            if (index !== req.body.id.length - 1)
                arrayIDs += `${id},`;
            else 
                arrayIDs += `${id}`;
        });

        db.any(`DELETE FROM lines WHERE id IN (${arrayIDs}) RETURNING id`,[true])
        .then((data) => {
            res.json({
                id: data
            });
        })
        .catch((err) => {
            res.send(err);
        });
    };
    
    return {
        getLines:   getLines,
        addLine:    addLine,
        deleteLine: deleteLine
    }
    
};

    

