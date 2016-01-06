<?php

    add_action( 'after_setup_theme', 'register_my_menu' );
	function register_my_menu() {
	  register_nav_menus( array('principal' => 'Menu principal', ) );
	}
    show_admin_bar(false);

if ( function_exists( 'add_theme_support' ) ) { 
		add_theme_support( 'post-thumbnails' );
		set_post_thumbnail_size( 150, 150, true ); // default Post Thumbnail dimensions (cropped)

		// additional image sizes
		// delete the next line if you do not need additional image sizes
		//add_image_size( 'image', 500, 500, true ); //300 pixels wide (and unlimited height)
	}

/**
 * Register our sidebars and widgetized areas.
 *
 */

	function custom_widgets_init() {


		register_sidebar( array(
			'name'          => 'Sidebar',
			'id'            => 'sidebar',
			'before_widget' => '<div>',
			'after_widget'  => '</div>',
			'before_title'  => '<p class="widget-title">',
			'after_title'   => '</p>',
		) );

	}
	add_action( 'widgets_init', 'custom_widgets_init' );

	/*function news_home( $atts ){
		$a = shortcode_atts( array(
		        'categorie' => 'defaut',
		), $atts );

		$b = shortcode_atts( array(
		        'number' => 'defaut',
		), $atts );

		global $post;
		include('actus-home.php');
	}
	add_shortcode( 'newsH', 'news_home' );*/



?>