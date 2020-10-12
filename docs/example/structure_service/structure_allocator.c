#include ".bin/structure_type.h"

data_t* structureCreate() {
	data_t* data = (data_t*) malloc(sizeof(data_t));
	data->steering_wheel.marker = 0;
	data->inverters.right.speed = (inverters_right_speed_data*) malloc(sizeof(inverters_right_speed_data) * 500);
	data->inverters.right.speed_count = 0;
	data->inverters.right.temperatureigbt = (inverters_right_temperatureigbt_data*) malloc(sizeof(inverters_right_temperatureigbt_data) * 500);
	data->inverters.right.temperatureigbt_count = 0;
	data->inverters.right.temperaturemotors = (inverters_right_temperaturemotors_data*) malloc(sizeof(inverters_right_temperaturemotors_data) * 500);
	data->inverters.right.temperaturemotors_count = 0;
	data->inverters.left.speed = (inverters_left_speed_data*) malloc(sizeof(inverters_left_speed_data) * 500);
	data->inverters.left.speed_count = 0;
	data->inverters.left.temperatureigbt = (inverters_left_temperatureigbt_data*) malloc(sizeof(inverters_left_temperatureigbt_data) * 500);
	data->inverters.left.temperatureigbt_count = 0;
	data->inverters.left.temperaturemotors = (inverters_left_temperaturemotors_data*) malloc(sizeof(inverters_left_temperaturemotors_data) * 500);
	data->inverters.left.temperaturemotors_count = 0;
	data->bmshv.temperature = (bmshv_temperature_data*) malloc(sizeof(bmshv_temperature_data) * 500);
	data->bmshv.temperature_count = 0;
	data->bmshv.voltage = (bmshv_voltage_data*) malloc(sizeof(bmshv_voltage_data) * 500);
	data->bmshv.voltage_count = 0;
	data->bmshv.current = (bmshv_current_data*) malloc(sizeof(bmshv_current_data) * 500);
	data->bmshv.current_count = 0;
	data->bmshv.errors = (bmshv_errors_data*) malloc(sizeof(bmshv_errors_data) * 500);
	data->bmshv.errors_count = 0;
	data->bmshv.warnings = (bmshv_warnings_data*) malloc(sizeof(bmshv_warnings_data) * 500);
	data->bmshv.warnings_count = 0;
	data->bmslv.values = (bmslv_values_data*) malloc(sizeof(bmslv_values_data) * 500);
	data->bmslv.values_count = 0;
	data->bmslv.errors = (bmslv_errors_data*) malloc(sizeof(bmslv_errors_data) * 500);
	data->bmslv.errors_count = 0;
	data->gps.new = (gps_new_data*) malloc(sizeof(gps_new_data) * 500);
	data->gps.new_count = 0;
	data->gps.old.location = (gps_old_location_data*) malloc(sizeof(gps_old_location_data) * 500);
	data->gps.old.location_count = 0;
	data->gps.old.time = (gps_old_time_data*) malloc(sizeof(gps_old_time_data) * 500);
	data->gps.old.time_count = 0;
	data->gps.old.truetrackmode = (gps_old_truetrackmode_data*) malloc(sizeof(gps_old_truetrackmode_data) * 500);
	data->gps.old.truetrackmode_count = 0;
	data->imugyro = (imugyro_data*) malloc(sizeof(imugyro_data) * 500);
	data->imugyro_count = 0;
	data->imuaccel = (imuaccel_data*) malloc(sizeof(imuaccel_data) * 500);
	data->imuaccel_count = 0;
	data->frontwheelsencoder = (frontwheelsencoder_data*) malloc(sizeof(frontwheelsencoder_data) * 500);
	data->frontwheelsencoder_count = 0;
	data->distance = (distance_data*) malloc(sizeof(distance_data) * 500);
	data->distance_count = 0;
	data->throttle = (throttle_data*) malloc(sizeof(throttle_data) * 500);
	data->throttle_count = 0;
	data->brake = (brake_data*) malloc(sizeof(brake_data) * 500);
	data->brake_count = 0;
	data->steeringwheel.encoder = (steeringwheel_encoder_data*) malloc(sizeof(steeringwheel_encoder_data) * 500);
	data->steeringwheel.encoder_count = 0;
	data->steeringwheel.gears = (steeringwheel_gears_data*) malloc(sizeof(steeringwheel_gears_data) * 500);
	data->steeringwheel.gears_count = 0;
	
	return data;
}