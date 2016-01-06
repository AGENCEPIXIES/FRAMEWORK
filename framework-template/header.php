<!doctype html>
<!--[if lt IE 7]>      <html class="no-js lt-ie9 lt-ie8 lt-ie7" lang=""> <![endif]-->
<!--[if IE 7]>         <html class="no-js lt-ie9 lt-ie8" lang=""> <![endif]-->
<!--[if IE 8]>         <html class="no-js lt-ie9" lang=""> <![endif]-->
<!--[if gt IE 8]><!-->
<html class="no-js" lang="">
<!--<![endif]-->

<head>

    <meta charset="utf-8">

    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <title><?php wp_title(); ?></title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="apple-touch-icon" href="apple-touch-icon.png">
    <link rel="icon" type="image/png" href="apple-touch-icon.png" />
    <link rel="stylesheet" href="<?php bloginfo('template_url'); ?>/pixies_framework/css/framework-init.css">
    <link rel="stylesheet" href="<?php bloginfo('template_url'); ?>/css/main.css">

    <script src="<?php bloginfo('template_url'); ?>/pixies_framework/js/vendor/modernizr-2.8.3-respond-1.4.2.min.js"></script>

    <?php wp_head(); ?>

</head>



<body <?php body_class(); ?>>
    <!--[if lt IE 8]>

            <p class="browserupgrade">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> to improve your experience.</p>

        <![endif]-->
        <nav class="navbar navbar-top" role="navigation">
          <div class="container">
            <div class="navbar-header">
              <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                <span class="sr-only">Toggle navigation</span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
              </button>
              <a class="navbar-brand" href="<?php bloginfo('url' ); ?>"><img title="<?php bloginfo('name' ); ?>" src="<?php bloginfo('template_directory' ); ?>/img/logo.png"></a>
            </div>
            <div id="navbar" class="navbar-collapse collapse">
                 <?php 
                          $menu = array(
                            'theme_location'  => 'principal',
                            'container'       => 'div',
                            'container_class' => 'navbar-right',
                            'container_id'    => '',
                            'menu_class'      => 'nav nav-pills',
                            'menu_id'         => '',
                            'echo'            => true,
                            'fallback_cb'     => 'wp_page_menu',
                            'before'          => '',
                            'after'           => '',
                            'link_before'     => '',
                            'link_after'      => '',
                            'items_wrap'      => '<ul id="%1$s" class="%2$s">%3$s</ul>',
                            'depth'           => 0,
                            'walker'          => ''
                          );
                        wp_nav_menu($menu); ?>
            </div><!--/.navbar-collapse -->
          </div>
        </nav>
    
    <!--/.navbar-collapse -->