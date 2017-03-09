<?php
/*
Plugin Name: My SEO текст
Description: Шорткод для добавления раскрывающегося текста [slidetext minheight="130" btnname="Подробнее" closebtnname="Подробнее"]Текст[/slidetext]
Author: Dmitriy
*/
class mySlideText {
	
	static $add_script;
	
	function __construct(){
		add_shortcode( 'slidetext', array(&$this, 'slidetext'));
		add_action('init', array(&$this, 'mySlideTextScript'));
		add_action('init', array(&$this, 'open_text_mce_button'));
		add_action('wp_footer', array(&$this, 'print_script'));
	}
	
	function slidetext($atts, $content=""){
		extract( shortcode_atts( array(
			'btnname' => __('Подробнее', 'myan'),
			'closebtnname' => __( 'Скрыть', 'myan' ),
			'minheight' => 130
		), $atts ) );
		$html  = '<div class="slide-text-wrapper"><div class="my-open-text" min-height="'.$minheight.'">';
		$html .= apply_filters('the_content', $content);
		$html .= '</div>';
		$html .= '<a href="javascript:;" class="my-open-text-btn" data-closebtnname="'.$closebtnname.'">'.$btnname.'</a></div>';
		self::$add_script = 1;
		return $html;
	}

	function mySlideTextScript(){
		wp_register_script( 'slidetext', plugins_url('open.text.min.js', __file__), 'jquery', 20170217, true);
		wp_register_style( 'slidetext', plugins_url('open.text.css', __file__) );
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
		$plugin_array['otsc'] = plugins_url('open.text.timce.js', __file__);
		return $plugin_array;
	}

	function print_script(){
		if ( ! self::$add_script )
			return;
		wp_print_scripts('slidetext');
		wp_print_styles('slidetext');
	}
}
new mySlideText; ?>