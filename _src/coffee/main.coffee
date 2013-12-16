site =
	global:
		init: ->
			console.log "ready to go!"

$ = jQuery.noConflict(true)

$ ->
	site.global.init()