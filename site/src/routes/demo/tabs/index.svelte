<script lang="ts">
	import { Tab, Icon, Label } from "@smui/core/tab";
	import { TabBar } from "@smui/core/tab-bar";
	import BasicTabs from "./_BasicTabs.svelte";
	import CustomIndicatorTabs from "./_CustomIndicatorTabs.svelte";
	import IconTabs from "./_IconTabs.svelte";
	import MinWidthTabs from "./_MinWidthTabs.svelte";
	import ScrollingTabs from "./_ScrollingTabs.svelte";
</script>

<style>
	section > div {
		margin-bottom: 40px;
	}

	.icon-indicators
		:global(.mdc-tab-indicator--active .mdc-tab-indicator__content) {
		opacity: 0.2;
	}
</style>

<svelte:head>
	<title>Tabs - SMUI</title>
</svelte:head>

<section>
	<h2>Tabs</h2>

	<BasicTabs />
	<IconTabs />
	<CustomIndicatorTabs />
	<MinWidthTabs />
	<ScrollingTabs />

	<!-- <div class="icon-indicators">
    Icon indicators:
    <TabBar tabs={['Home', 'Merchandise', 'About Us']} let:tab>
      <Tab
        {tab}
        tabIndicator$type="icon"
        tabIndicator$content$class="material-icons">
        <Label>{tab}</Label>
        <span slot="tab-indicator">star</span>
      </Tab>
    </TabBar>
  </div> -->
</section>
