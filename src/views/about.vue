<template>
	<div>
		<div class="test-less">
			这是{{lesspage}}页面
		</div>
		<div class="test-sass">
			这是{{sasspage}}页面
		</div>
		<div class="test-stylus">
			这是{{styluspage}}页面
		</div>
	</div>
</template>
<script>
	module.exports = {
		data: function () {
			return {
				lesspage: 'test-less',
				sasspage: 'test-sass',
				styluspage: 'test-stylus'
			}
		}
	}
</script>
<style lang = "less">
    @color: #00f;
    .test-less {
        color: @color;
    }
</style>
<style lang = "sass">
    $color: #0ff;
    .test-sass {
        color: $color;
    }
</style>
<style lang = "stylus">
    color = #f00;
    .test-stylus {
        color: color;
    }
</style>