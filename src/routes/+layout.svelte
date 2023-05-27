<script>
	import './styles.css';
</script>

<div class="app">
		<slot />
</div>

<style>
	.app {
		position: relative;
		display: flex;
		flex-direction: column;
		height: 100vh;
		overflow: auto;
	}
</style>
