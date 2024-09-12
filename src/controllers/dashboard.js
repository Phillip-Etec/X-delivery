export default {
    dashboardView: (req, res) => {
        if(req.isAuthenticated ()) {
            res.render( 'dashboard', { 
                name: req.user.name 
            } );
        }
        else {
            res.render( 'dashboard');
        }
    }
}
