const router = require ('express').Router();
const { blog, user } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async, (req, res) => {
    try {
        const blogData = await blog.findAll({
            include: [
                {
                    model: user,
                    attributes: ['name'],
                },
            ],
        });

        const blog = blogData.map((blog) => blog.get({ plain: true}));

        res.render('homepage', {
            blog,
            logged_in: req.session.logged_in
        });
     } catch (err) {
        res.status(500).json(err);
     }
}); 

router.get('/blog/:id', async (req, res) => {
    try {
        const blogData = await blog.findByPk(req.params.id, {
            include: [
                {
                    model: user,
                    attributes: ['name'],
                },
            ],
        });

        const blog = blogData.get({ plain: true });
        res.render('blog', {
            ...blog,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
}); 

router.get('/profile', withAuth, async (req, res) => {
    try {
        const userData = await user.findByPk(req.session.user_id, {
            attributes: { exclude: ['password'] },
            include: [{ model: blog }],
        });

        const user = userData.get({ plain: true });
        res.render('profile', {
            ...user,
            logged_in: true
        });
    } catch (err) {
        res.status(500).json(err);
    }
}); 

router.get('/login', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/profile');
        return;
    }

    res.render('login');
});

module.exports = router;