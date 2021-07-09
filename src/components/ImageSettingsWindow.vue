<template>
	<b-modal
		id="image-settings-window"
		title="image settings"
		v-on:ok="submitModal">

		<b-form>
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
		});
	},

	data() {
		return {
			gridSize: null,
			gridItemSize: null,
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
				gridSize: _me.gridSize,
				gridItemSize: _me.gridItemSize,
			})
		}
	},
};
</script>
