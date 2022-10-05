<template>
	<b-modal
		id="image-settings-window"
		title="image settings"
		v-on:ok="submitModal">

		<b-form>
			<b-tabs content-class="mt-3" ref="tabs">
				<b-tab title="8bit" active>
					<template #title>
						8bit
					</template>
						<b-form-group label="grid item size">
							<b-form-input
								v-model="gridItemSize"
								class="griditemsize"
								type="number"
								min="1"
								max="100"
							/>
						</b-form-group>
						<b-form-group label="grid size">
							<b-form-radio-group
								class="control-button grid-size-container"
								buttons
								v-model="gridSize"

							>
								<template v-for="option in gridSizes">
									<b-form-radio :value="option.value" :key="option.index">
										{{ option.name }}
									</b-form-radio>
								</template>
							</b-form-radio-group>
						</b-form-group>
				</b-tab>
				<b-tab title="photo (tbd)" disabled>
					<template #title>
						photo (tbd)
					</template>
					<b-form-group label="width (px)">
						<b-form-input
							v-model="gridWidth"
							class="gridWidth"
							type="number"
							min="1"
						/>
					</b-form-group>
					<b-form-group label="height (px)">
						<b-form-input
							v-model="gridHeight"
							class="gridHeight"
							type="number"
							min="1"
						/>
					</b-form-group>
				</b-tab>
			</b-tabs>
		</b-form>
	</b-modal>
</template>

<script>
import EventBus from "../utils/EventBus";

export default {
	name: "ImageSettingsWindow",

	mounted() {
		var _me = this;
		EventBus.$on("setConfigDefaults", function (pDefaults) {
			_me.gridSize = pDefaults.gridSize;
			_me.gridItemSize = pDefaults.gridItemSize;
			_me.gridWidth = pDefaults.gridWidth;
			_me.gridHeight = pDefaults.gridHeight;
		});
	},

	data() {
		return {
			gridSize: null,
			gridItemSize: null,
			gridWidth: null,
			gridHeight: null,
			gridSizes: [
				{
					name: "8x8",
					value: 8,
				},
				{
					name: "12x12",
					value: 12,
				},
				{
					name: "16x16",
					value: 16,
				},
				{
					name: "32x32",
					value: 32,
				},
				{
					name: "32x64",
					value: "32x64",
				},
				{
					name: "64x32",
					value: "64x32",
				},
			],
		};
	},

	methods: {
		submitModal: function(){
			var _me = this;

			_me.$emit('submit', {
				mode: _me.$refs.tabs.currentTab,
				gridSize: _me.gridSize,
				gridItemSize: _me.gridItemSize,
				gridWidth: _me.gridWidth,
				gridHeight: _me.gridHeight,
			})
		}
	},
};
</script>
