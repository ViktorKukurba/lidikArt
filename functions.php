<?php

function my_scripts() {
	$styles = array(
		'/css/bootstrap.css',
		'/bower_components/fancybox/source/jquery.fancybox.css?v=2.1.5',
		'/bower_components/fancybox/source/helpers/jquery.fancybox-buttons.css?v=1.0.5',
		'/bower_components/fancybox/source/helpers/jquery.fancybox-thumbs.css?v=1.0.5',
		'/bower_components/slick-carousel/slick/slick-theme.css',
		'/bower_components/slick-carousel/slick/slick.css',
		'/fonts/css/font-awesome.min.css',
		'/build/lidik-art.css',
	);
	add_filter('script_loader_tag', 'add_attribute_to_script', 10, 2);
	function add_attribute_to_script($tag, $handle) {
		$format = ' data-main="%s/build/main.js" src';
    	$dataAttr = sprintf($format, get_template_directory_uri());
		return str_replace( ' src', $dataAttr, $tag );
	}
	wp_enqueue_script('script', get_template_directory_uri() . '/bower_components/requirejs/require.js');
	foreach ($styles as $index=>$style ) {
		wp_enqueue_style('style' . $index, get_template_directory_uri() . $style);
	}
}
remove_filter('template_redirect', 'redirect_canonical');
add_action( 'wp_enqueue_scripts', 'my_scripts' );
add_theme_support('post-thumbnails');

/**
 * Customizer additions.
 */
//require get_parent_theme_file_path( '/inc/customizer.php' );
?>