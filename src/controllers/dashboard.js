export default {
    dashboardView: (req, res) => {
        if(req.isAuthenticated ()) {
            res.render( 'index', { 
                name: req.user.name 
            } );
        }
        else {
            res.render( 'index');
        }
    }
}
