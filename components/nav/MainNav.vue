<template>
	<nav class="main-nav" :class="routeName">
		<div class="middle-button">
			<button class="link-text link-text--light">{{ $t('contact') }}</button>
		</div>
		<NavLink key="home" name="home" to="/" icon="home">{{
			$t('pages.home')
		}}</NavLink>
		<NavLink key="lamps" name="lamps" to="/lamps" icon="lightbulb">{{
			$t('pages.lamps')
		}}</NavLink>
		<NavLink
			key="belt-bags"
			name="belt-bags"
			to="/belt-bags"
			icon="shopping-bag"
			>{{ $t('pages.belt-bags') }}</NavLink
		>
		<NavLink key="paintings" name="paintings" to="paintings" icon="image">{{
			$t('pages.paintings')
		}}</NavLink>
		<NavLink
			v-if="newProducts === 0"
			key="gallery"
			name="gallery"
			to="/gallery"
			icon="grip-vertical"
			>{{ $t('pages.gallery') }}</NavLink
		>
		<NavLink
			v-else
			key="gallery"
			name="gallery"
			:to="{ name: 'gallery', query: { filter: 'new' } }"
			icon="grip-vertical"
			>{{ $t('pages.gallery') }}
			<span
				class="w-6 h-6 bg-secondary rounded-full absolute top-1 right-3 flex text-xs text-white box-content border-2 border-gray-100"
			>
				<span class="m-auto">
					{{ newProducts > 9 ? '9+' : `+${newProducts}` }}
				</span>
			</span>
		</NavLink>
	</nav>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
	name: 'MainNav',
	props: {
		newProducts: {
			type: Number,
			default: 0,
		},
		areNew: {
			type: Boolean,
			default: false,
		},
	},
	computed: {
		routeName(): string {
			return this.$route.name?.split('___')[0] || 'index'
		},
	},
})
</script>

<style lang="scss" scoped>
.main-nav {
	--link-width: 20vw;
	@apply fixed inset-x-0 bottom-0;
	@apply bg-gray-100 border-t-2;
	z-index: 2000;
	height: var(--nav-height);

	> * {
		width: var(--link-width);
		height: var(--nav-height);
	}
}

.new-icon {
	position: absolute;
	width: 10px;
	height: 10px;
	border-radius: 50%;
	background: red;
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
		--button-size: theme(spacing.20);

		position: absolute;
		top: calc(50% + 1px);
		left: 50%;
		margin-left: calc(var(--button-size) / -2);
		margin-top: calc(var(--button-size) / -2);
		width: var(--button-size);
		height: var(--button-size);
		&:before {
			content: '';
			@apply absolute -z-1 inset-0 bg-primary rounded-md;
			@apply transform rotate-45;
		}
	}
}
</style>
