<template>
	<nav class="main-nav" :class="route.name">
		<div class="middle-button">
			<button>kontakt</button>
		</div>
		<NavLink key="home" name="home" to="/" icon="home">Home</NavLink>
		<NavLink key="lamps" name="lamps" to="lamps" icon="home">Lampy</NavLink>
		<NavLink key="belt-bags" name="belt-bags" to="belt-bags" icon="home"
			>Saszetki</NavLink
		>
		<NavLink key="paintings" name="paintings" to="paintings" icon="image"
			>Obrazy</NavLink
		>
		<NavLink key="gallery" name="gallery" to="gallery" icon="image"
			>Galeria</NavLink
		>
	</nav>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
	name: 'MainNav',
	computed: {
		route() {
			return this.$route
		},
	},
})
</script>

<style lang="scss" scoped>
.main-nav {
	position: fixed;
	z-index: 2000;
	// top: calc(100% - #{$mobile-nav-height});
	left: 0;
	right: 0;
	bottom: 0;
	height: $mobile-nav-height;
	background: $gray9;

	// display: grid;
	// grid-template-columns: repeat(5, 20%);
}

@mixin out {
	transform: translateX(calc(var(--link-width) * -1));
	opacity: 0;
	pointer-events: none;
}
@mixin one {
	transform: translateX(0);
	opacity: 1;
	pointer-events: all;
}
@mixin two {
	transform: translateX(var(--link-width));
	opacity: 1;
	pointer-events: all;
}
@mixin three {
	transform: translateX(calc(var(--link-width) * 3));
	opacity: 1;
	pointer-events: all;
}

.nav-link {
	--link-width: 20vw;
	position: absolute;
	top: 0;
	left: 0;
	width: var(--link-width);
	height: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;

	&.home {
		@include out;
	}
	&.lamps {
		@include one;
	}
	&.belt-bags {
		@include two;
	}
	&.paintings {
		@include three;
	}
	&.gallery {
		transform: translateX(calc(var(--link-width) * 4));
	}
}
.main-nav {
	&.lamps .nav-link {
		&.home {
			@include one;
		}
		&.lamps {
			@include out;
		}
	}
}
</style>
