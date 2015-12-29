<?php
/*
Plugin Name: My SEO текст
Description: Шорткод для добавления раскрывающегося текста [slidetext minheight="130" btnname="Подробнее"]Текст[/slidetext]
Author: Dmitriy
*/
class mySlideText {
	function __construct(){
		add_shortcode( 'slidetext', array(&$this, 'slidetext'));
		add_action( 'wp_enqueue_scripts', array(&$this, 'mySlideTextScript'));
		add_action('init', array(&$this, 'open_text_mce_button'));
	}
	
	function slidetext($atts, $content=""){
		extract( shortcode_atts( array(
			'btnname' => __('Подробнее'),
			'minheight' => 130
		), $atts ) );
		$html  = '<div class="slide-text-wrapper"><div class="my-open-text" style="overflow: hidden;" min-height="'.$minheight.'">';
		$html .= apply_filters('the_content', $content);
		$html .= '</div>';
		$html .= '<a href="javascript:;" class="my-open-text-btn">'.$btnname.'</a></div>';
		return $html;
	}

	function mySlideTextScript(){
		wp_register_script( 'slidetext', plugins_url('open.text.js', __file__), 'jquery', 20151606, true);
		wp_enqueue_script('slidetext');
	}

	function open_text_mce_button() {
		if ( current_user_can('edit_posts') &&  current_user_can('edit_pages') ){
			add_filter('mce_buttons', array(&$this, 'open_text_add_button'));
			add_filter('mce_external_plugins', array(&$this, 'open_text_add_plugin'));
		}
	}

	function open_text_add_button($buttons){
		array_push($buttons,"otbtn");return $buttons;
	}

	function open_text_add_plugin($plugin_array) {
		//$plugin_array['otsc'] = get_bloginfo('template_url').'/opentext/open.text.timce.js';
		$plugin_array['otsc'] = plugins_url('open.text.timce.js', __file__);
		return $plugin_array;
	}

}
new mySlideText;

?>