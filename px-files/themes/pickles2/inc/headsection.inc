<?php /*
すべての layout について共通の、headセクションの記述
*/ ?>

<?= $px->get_contents_manifesto(); ?>

		<link rel="stylesheet" href="<?= htmlspecialchars( $theme->files('/modules.css') ); ?>" />
		<link rel="stylesheet" href="<?= htmlspecialchars( $theme->files('/styles/theme.css') ); ?>">

    <link rel="shortcut icon" href="/favicon.ico">
    <link rel="apple-touch-icon" href="/apple-touch-icon.png">
    <link rel="stylesheet" href="//fonts.googleapis.com/earlyaccess/notosansjapanese.css">
    <link rel="stylesheet" href="/assets/css/app.css">
    <link rel="stylesheet" href="/assets/css/module.css">

    <script src="/assets/js/bundle.js"></script>
    <script src="/assets/js/app.js"></script>
    <script src="/assets/js/module.js"></script>
