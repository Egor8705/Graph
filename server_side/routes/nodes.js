const log = require("../lib/log")(module);

module.exports = (db) => {

    function getNodes(req,res){
        db.any("SELECT * FROM nodes",[true])
            .then(function (data) {
                res.json({nodes:data});
            })
            .catch(function (err) {
                res.send(err);
            });
    };
    
    function changeNodePosition(req,res){
        db.any(`UPDATE nodes SET X = ${req.body.X},Y = ${req.body.Y} WHERE id = ${req.body.id}`,[true])
            .then(() => {
                res.json({
                    id: req.body.id,
                    X:  req.body.X,
                    Y:  req.body.Y
                });
            })
            .catch((err) => {
                res.send(err);;
            });
    };

    function addNode(req, res){
        db.any(`INSERT INTO nodes (X,Y) VALUES (${req.body.x},${req.body.y}) RETURNING id`,[true])
        .then((data) => {
            res.json({
                id: data[0].id,
                x: req.body.x,
                y: req.body.y
            });
        })
        .catch((err) => {
            res.send(err);
        });
    };
    
    function deleteNode(req, res){
        db.any(`DELETE FROM nodes WHERE id = ${req.body.id} RETURNING id`,[true])
        .then((data) => {
            res.json({
                id: data[0].id
            });
        })
        .catch((err) => {
            res.send(err);
        });
    };
    
    return {
        addNode: addNode,
        getNodes: getNodes,
        deleteNode: deleteNode,
        changeNodePosition:changeNodePosition 
    };   
};