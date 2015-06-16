(function(){
	tinymce.PluginManager.requireLangPack('otsc');
	console.log(tinymce);
	tinymce.create('tinymce.plugins.otsc', {
		init : function(ed, url){
			ed.addCommand('cmd_ot', function(){
				ilc_sel_content = tinyMCE.activeEditor.selection.getContent();
				tinyMCE.activeEditor.selection.setContent('[slidetext btnname="Подробнее"  minheight="130"]' + ilc_sel_content + '[/slidetext]'); // замените на квадратные скобки
			});
			ed.addButton('otbtn', {
				title: 'Open Text',
				image: 'http://'+window.location.host+'/wp-content/plugins/opentext/arrow_down.ico',
				cmd: 'cmd_ot'
			});
		},
		createControl : function(n, cm){
			return null;
		},
	});
	tinymce.PluginManager.add('otsc', tinymce.plugins.otsc);
})();