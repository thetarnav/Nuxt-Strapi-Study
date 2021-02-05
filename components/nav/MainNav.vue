<template>
	<nav class="main-nav" :class="route.name">
		<div class="middle-button">
			<button>kontakt</button>
		</div>
		<NavLink key="home" name="home" to="index" icon="home">Home</NavLink>
		<NavLink key="lamps" name="lamps" to="lamps" icon="lightbulb"
			>Lampy</NavLink
		>
		<NavLink
			key="belt-bags"
			name="belt-bags"
			to="belt-bags"
			icon="shopping-bag"
			>Saszetki</NavLink
		>
		<NavLink key="paintings" name="paintings" to="paintings" icon="image"
			>Obrazy</NavLink
		>
		<NavLink key="gallery" name="gallery" to="gallery" icon="grip-vertical"
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
	--link-width: 20vw;
	position: fixed;
	z-index: 2000;
	left: 0;
	right: 0;
	bottom: 0;
	height: var(--nav-height);
	background: $gray9;

	> * {
		width: var(--link-width);
		height: var(--nav-height);
	}
}

@mixin out {
	// transform: translateX(calc(var(--link-width) * -1));
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
@mixin four {
	transform: translateX(calc(var(--link-width) * 4));
	opacity: 1;
	pointer-events: all;
}

.nav-link {
	position: absolute;
	top: 0;
	left: 0;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;

	transition: opacity 0.2s transform 0.4s;

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
		@include four;
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
	&.belt-bags .nav-link {
		&.home {
			@include one;
		}
		&.belt-bags {
			@include out;
		}
		&.lamps {
			@include two;
		}
	}
	&.paintings .nav-link {
		&.home {
			@include one;
		}
		&.lamps {
			@include two;
		}
		&.belt-bags {
			@include three;
		}
		&.paintings {
			@include out;
		}
	}
	&.gallery .nav-link {
		&.home {
			@include one;
		}
		&.lamps {
			@include two;
		}
		&.belt-bags {
			@include three;
		}
		&.paintings {
			@include four;
		}
		&.gallery {
			@include out;
		}
	}
}

.middle-button {
	position: fixed;
	z-index: 2010;
	right: 0;
	bottom: 0;
	transform: translateX(calc(var(--link-width) * -2))
		translateY(calc(var(--nav-height) / -2));
	button {
		$button-size: 80px;

		position: absolute;
		top: 50%;
		left: 50%;
		margin-left: -$button-size/2;
		margin-top: -$button-size/2;
		width: $button-size;
		height: $button-size;
		border-radius: 50%;
		background: $primary;
		color: $white;
	}
}
</style>
