typedef struct {
	char* a;
	int b;
	double d;
	char** arr;
	int arr_count;
	int* arrr;
	int arrr_count;
	double* arrrr;
	int arrrr_count;
} obj1_config_t;

typedef struct {
	char* a;
	int b;
	double d;
	char** arr;
	int arr_count;
	int* arrr;
	int arrr_count;
	double* arrrr;
	int arrrr_count;
} obj2_config_t;

typedef struct {
	char* a;
	int b;
	double d;
	char** arr;
	int arr_count;
	int* arrr;
	int arrr_count;
	double* arrrr;
	int arrrr_count;
	obj1_config_t obj1;
	obj2_config_t obj2;
} config_t;


// -------------------

config->a = strdup("ciao");
config->b = 23;
config->d = 23.23;
config->arr_count = 2;
config->arr = (char**) malloc(sizeof(char*) * config->arr_count);
config->arr[0] = strdup("asdf");
config->arr[1] = strdup("asdf");
config->arrr_count = 2;
config->arrr = (int*) malloc(sizeof(int) * config->arrr_count);
config->arrr[0] = 2;
config->arrr[1] = 3;
config->arrrr_count = 1;
config->arrrr = (double*) malloc(sizeof(double) * config->arrrr_count);
config->arrrr[0] = 2.3;
config->obj1.a = strdup("ciao");
config->obj1.b = 23;
config->obj1.d = 23.23;
config->obj1.arr_count = 2;
config->obj1.arr = (char**) malloc(sizeof(char*) * config->obj1.arr_count);
config->obj1.arr[0] = strdup("asdf");
config->obj1.arr[1] = strdup("asdf");
config->obj1.arrr_count = 2;
config->obj1.arrr = (int*) malloc(sizeof(int) * config->obj1.arrr_count);
config->obj1.arrr[0] = 2;
config->obj1.arrr[1] = 3;
config->obj1.arrrr_count = 1;
config->obj1.arrrr = (double*) malloc(sizeof(double) * config->obj1.arrrr_count);
config->obj1.arrrr[0] = 2.3;
config->obj2.a = strdup("ciao");
config->obj2.b = 23;
config->obj2.d = 23.23;
config->obj2.arr_count = 2;
config->obj2.arr = (char**) malloc(sizeof(char*) * config->obj2.arr_count);
config->obj2.arr[0] = strdup("asdf");
config->obj2.arr[1] = strdup("asdf");
config->obj2.arrr_count = 2;
config->obj2.arrr = (int*) malloc(sizeof(int) * config->obj2.arrr_count);
config->obj2.arrr[0] = 2;
config->obj2.arrr[1] = 3;
config->obj2.arrrr_count = 1;
config->obj2.arrrr = (double*) malloc(sizeof(double) * config->obj2.arrrr_count);
config->obj2.arrrr[0] = 2.3;


// -------------------

printf("config->a:\t%s\n", config->a);
printf("config->b:\t%d\n", config->b);
printf("config->d:\t%f\n", config->d);
printf("config->arr: ");
printStringsArray(config->arr, config->arr_count);
printf("config->arrr: ");
printIntArray(config->arrr);
printf("config->arrrr: ");
printDoubleArray(config->arrrr);
printf("config->obj1.a:\t%s\n", config->obj1.a);
printf("config->obj1.b:\t%d\n", config->obj1.b);
printf("config->obj1.d:\t%f\n", config->obj1.d);
printf("config->obj1.arr: ");
printStringsArray(config->obj1.arr, config->obj1.arr_count);
printf("config->obj1.arrr: ");
printIntArray(config->obj1.arrr);
printf("config->obj1.arrrr: ");
printDoubleArray(config->obj1.arrrr);
printf("config->obj2.a:\t%s\n", config->obj2.a);
printf("config->obj2.b:\t%d\n", config->obj2.b);
printf("config->obj2.d:\t%f\n", config->obj2.d);
printf("config->obj2.arr: ");
printStringsArray(config->obj2.arr, config->obj2.arr_count);
printf("config->obj2.arrr: ");
printIntArray(config->obj2.arrr);
printf("config->obj2.arrrr: ");
printDoubleArray(config->obj2.arrrr);


// -------------------

data->inverters.right.speed_size = 500;
data->inverters.right.speed = (inverters_right_speed_data*) malloc(sizeof(inverters_right_speed_data) * data->inverters.right.speed_size);
data->inverters.right.speed_count = 0;
data->inverters.right.temperature_igbt_size = 500;
data->inverters.right.temperature_igbt = (inverters_right_temperature_igbt_data*) malloc(sizeof(inverters_right_temperature_igbt_data) * data->inverters.right.temperature_igbt_size);
data->inverters.right.temperature_igbt_count = 0;
data->inverters.right.temperature_motors_size = 500;
data->inverters.right.temperature_motors = (inverters_right_temperature_motors_data*) malloc(sizeof(inverters_right_temperature_motors_data) * data->inverters.right.temperature_motors_size);
data->inverters.right.temperature_motors_count = 0;
data->inverters.left.speed_size = 500;
data->inverters.left.speed = (inverters_left_speed_data*) malloc(sizeof(inverters_left_speed_data) * data->inverters.left.speed_size);
data->inverters.left.speed_count = 0;
data->inverters.left.temperature_igbt_size = 500;
data->inverters.left.temperature_igbt = (inverters_left_temperature_igbt_data*) malloc(sizeof(inverters_left_temperature_igbt_data) * data->inverters.left.temperature_igbt_size);
data->inverters.left.temperature_igbt_count = 0;
data->inverters.left.temperature_motors_size = 500;
data->inverters.left.temperature_motors = (inverters_left_temperature_motors_data*) malloc(sizeof(inverters_left_temperature_motors_data) * data->inverters.left.temperature_motors_size);
data->inverters.left.temperature_motors_count = 0;
data->bms_hv.temperature_size = 500;
data->bms_hv.temperature = (bms_hv_temperature_data*) malloc(sizeof(bms_hv_temperature_data) * data->bms_hv.temperature_size);
data->bms_hv.temperature_count = 0;
data->bms_hv.voltage_size = 500;
data->bms_hv.voltage = (bms_hv_voltage_data*) malloc(sizeof(bms_hv_voltage_data) * data->bms_hv.voltage_size);
data->bms_hv.voltage_count = 0;
data->bms_hv.current_size = 500;
data->bms_hv.current = (bms_hv_current_data*) malloc(sizeof(bms_hv_current_data) * data->bms_hv.current_size);
data->bms_hv.current_count = 0;
data->bms_hv.errors_size = 500;
data->bms_hv.errors = (bms_hv_errors_data*) malloc(sizeof(bms_hv_errors_data) * data->bms_hv.errors_size);
data->bms_hv.errors_count = 0;
data->bms_hv.warnings_size = 500;
data->bms_hv.warnings = (bms_hv_warnings_data*) malloc(sizeof(bms_hv_warnings_data) * data->bms_hv.warnings_size);
data->bms_hv.warnings_count = 0;
data->bms_lv.values_size = 500;
data->bms_lv.values = (bms_lv_values_data*) malloc(sizeof(bms_lv_values_data) * data->bms_lv.values_size);
data->bms_lv.values_count = 0;
data->bms_lv.errors_size = 500;
data->bms_lv.errors = (bms_lv_errors_data*) malloc(sizeof(bms_lv_errors_data) * data->bms_lv.errors_size);
data->bms_lv.errors_count = 0;
data->gps.new_size = 500;
data->gps.new = (gps_new_data*) malloc(sizeof(gps_new_data) * data->gps.new_size);
data->gps.new_count = 0;
data->gps.old.location_size = 500;
data->gps.old.location = (gps_old_location_data*) malloc(sizeof(gps_old_location_data) * data->gps.old.location_size);
data->gps.old.location_count = 0;
data->gps.old.time_size = 500;
data->gps.old.time = (gps_old_time_data*) malloc(sizeof(gps_old_time_data) * data->gps.old.time_size);
data->gps.old.time_count = 0;
data->gps.old.true_track_mode_size = 500;
data->gps.old.true_track_mode = (gps_old_true_track_mode_data*) malloc(sizeof(gps_old_true_track_mode_data) * data->gps.old.true_track_mode_size);
data->gps.old.true_track_mode_count = 0;
data->imu_gyro_size = 500;
data->imu_gyro = (imu_gyro_data*) malloc(sizeof(imu_gyro_data) * data->imu_gyro_size);
data->imu_gyro_count = 0;
data->imu_accel_size = 500;
data->imu_accel = (imu_accel_data*) malloc(sizeof(imu_accel_data) * data->imu_accel_size);
data->imu_accel_count = 0;
data->front_wheels_encoder_size = 500;
data->front_wheels_encoder = (front_wheels_encoder_data*) malloc(sizeof(front_wheels_encoder_data) * data->front_wheels_encoder_size);
data->front_wheels_encoder_count = 0;
data->distance_size = 500;
data->distance = (distance_data*) malloc(sizeof(distance_data) * data->distance_size);
data->distance_count = 0;
data->throttle_size = 500;
data->throttle = (throttle_data*) malloc(sizeof(throttle_data) * data->throttle_size);
data->throttle_count = 0;
data->brake_size = 500;
data->brake = (brake_data*) malloc(sizeof(brake_data) * data->brake_size);
data->brake_count = 0;
data->steering_wheel.encoder_size = 500;
data->steering_wheel.encoder = (steering_wheel_encoder_data*) malloc(sizeof(steering_wheel_encoder_data) * data->steering_wheel.encoder_size);
data->steering_wheel.encoder_count = 0;
data->steering_wheel.gears_size = 500;
data->steering_wheel.gears = (steering_wheel_gears_data*) malloc(sizeof(steering_wheel_gears_data) * data->steering_wheel.gears_size);
data->steering_wheel.gears_count = 0;


// -------------------

*bson_document = bson_new();
bson_t *children = (bson_t*)malloc(sizeof(bson_t) * 5);
BSON_APPEND_INT32(*bson_document, "id", data->id);
BSON_APPEND_INT64(*bson_document, "timestamp", data->timestamp);
BSON_APPEND_UTF8(*bson_document, "sessionName", data->sessionName);
BSON_APPEND_DOCUMENT_BEGIN(*bson_document, "inverters", &children[0]);
BSON_APPEND_DOCUMENT_BEGIN(&children[0], "right", &children[1]);
BSON_APPEND_ARRAY_BEGIN(&children[1], "speed", &children[2]);
for (int i = 0; i < (data->inverters.right.speed_count); i++)
{
	BSON_APPEND_DOCUMENT_BEGIN(&children[2], "0", &children[3]);
	BSON_APPEND_INT64(&children[3], "timestamp", data->inverters.right.speed[i].timestamp);
	BSON_APPEND_INT32(&children[3], "value", data->inverters.right.speed[i].value);
	bson_append_document_end(&children[2], &children[3]);
	bson_destroy(&children[3]);
}
bson_append_array_end(&children[1], &children[2]);
bson_destroy(&children[2]);
BSON_APPEND_ARRAY_BEGIN(&children[1], "temperature_igbt", &children[2]);
for (int i = 0; i < (data->inverters.right.temperature_igbt_count); i++)
{
	BSON_APPEND_DOCUMENT_BEGIN(&children[2], "0", &children[3]);
	BSON_APPEND_INT64(&children[3], "timestamp", data->inverters.right.temperature_igbt[i].timestamp);
	BSON_APPEND_INT32(&children[3], "value", data->inverters.right.temperature_igbt[i].value);
	bson_append_document_end(&children[2], &children[3]);
	bson_destroy(&children[3]);
}
bson_append_array_end(&children[1], &children[2]);
bson_destroy(&children[2]);
BSON_APPEND_ARRAY_BEGIN(&children[1], "temperature_motors", &children[2]);
for (int i = 0; i < (data->inverters.right.temperature_motors_count); i++)
{
	BSON_APPEND_DOCUMENT_BEGIN(&children[2], "0", &children[3]);
	BSON_APPEND_INT64(&children[3], "timestamp", data->inverters.right.temperature_motors[i].timestamp);
	BSON_APPEND_INT32(&children[3], "value", data->inverters.right.temperature_motors[i].value);
	bson_append_document_end(&children[2], &children[3]);
	bson_destroy(&children[3]);
}
bson_append_array_end(&children[1], &children[2]);
bson_destroy(&children[2]);
bson_append_document_end(&children[0], &children[1]);
bson_destroy(&children[1]);
BSON_APPEND_DOCUMENT_BEGIN(&children[0], "left", &children[1]);
BSON_APPEND_ARRAY_BEGIN(&children[1], "speed", &children[2]);
for (int i = 0; i < (data->inverters.left.speed_count); i++)
{
	BSON_APPEND_DOCUMENT_BEGIN(&children[2], "0", &children[3]);
	BSON_APPEND_INT64(&children[3], "timestamp", data->inverters.left.speed[i].timestamp);
	BSON_APPEND_INT32(&children[3], "value", data->inverters.left.speed[i].value);
	bson_append_document_end(&children[2], &children[3]);
	bson_destroy(&children[3]);
}
bson_append_array_end(&children[1], &children[2]);
bson_destroy(&children[2]);
BSON_APPEND_ARRAY_BEGIN(&children[1], "temperature_igbt", &children[2]);
for (int i = 0; i < (data->inverters.left.temperature_igbt_count); i++)
{
	BSON_APPEND_DOCUMENT_BEGIN(&children[2], "0", &children[3]);
	BSON_APPEND_INT64(&children[3], "timestamp", data->inverters.left.temperature_igbt[i].timestamp);
	BSON_APPEND_INT32(&children[3], "value", data->inverters.left.temperature_igbt[i].value);
	bson_append_document_end(&children[2], &children[3]);
	bson_destroy(&children[3]);
}
bson_append_array_end(&children[1], &children[2]);
bson_destroy(&children[2]);
BSON_APPEND_ARRAY_BEGIN(&children[1], "temperature_motors", &children[2]);
for (int i = 0; i < (data->inverters.left.temperature_motors_count); i++)
{
	BSON_APPEND_DOCUMENT_BEGIN(&children[2], "0", &children[3]);
	BSON_APPEND_INT64(&children[3], "timestamp", data->inverters.left.temperature_motors[i].timestamp);
	BSON_APPEND_INT32(&children[3], "value", data->inverters.left.temperature_motors[i].value);
	bson_append_document_end(&children[2], &children[3]);
	bson_destroy(&children[3]);
}
bson_append_array_end(&children[1], &children[2]);
bson_destroy(&children[2]);
bson_append_document_end(&children[0], &children[1]);
bson_destroy(&children[1]);
bson_append_document_end(*bson_document, &children[0]);
bson_destroy(&children[0]);
BSON_APPEND_DOCUMENT_BEGIN(*bson_document, "bms_hv", &children[0]);
BSON_APPEND_ARRAY_BEGIN(&children[0], "temperature", &children[1]);
for (int i = 0; i < (data->bms_hv.temperature_count); i++)
{
	BSON_APPEND_DOCUMENT_BEGIN(&children[1], "0", &children[2]);
	BSON_APPEND_INT64(&children[2], "timestamp", data->bms_hv.temperature[i].timestamp);
	BSON_APPEND_DOCUMENT_BEGIN(&children[2], "value", &children[3]);
	BSON_APPEND_DOUBLE(&children[3], "max", data->bms_hv.temperature[i].value.max);
	BSON_APPEND_DOUBLE(&children[3], "min", data->bms_hv.temperature[i].value.min);
	BSON_APPEND_DOUBLE(&children[3], "average", data->bms_hv.temperature[i].value.average);
	bson_append_document_end(&children[2], &children[3]);
	bson_destroy(&children[3]);
	bson_append_document_end(&children[1], &children[2]);
	bson_destroy(&children[2]);
}
bson_append_array_end(&children[0], &children[1]);
bson_destroy(&children[1]);
BSON_APPEND_ARRAY_BEGIN(&children[0], "voltage", &children[1]);
for (int i = 0; i < (data->bms_hv.voltage_count); i++)
{
	BSON_APPEND_DOCUMENT_BEGIN(&children[1], "0", &children[2]);
	BSON_APPEND_INT64(&children[2], "timestamp", data->bms_hv.voltage[i].timestamp);
	BSON_APPEND_DOCUMENT_BEGIN(&children[2], "value", &children[3]);
	BSON_APPEND_DOUBLE(&children[3], "max", data->bms_hv.voltage[i].value.max);
	BSON_APPEND_DOUBLE(&children[3], "min", data->bms_hv.voltage[i].value.min);
	BSON_APPEND_DOUBLE(&children[3], "total", data->bms_hv.voltage[i].value.total);
	bson_append_document_end(&children[2], &children[3]);
	bson_destroy(&children[3]);
	bson_append_document_end(&children[1], &children[2]);
	bson_destroy(&children[2]);
}
bson_append_array_end(&children[0], &children[1]);
bson_destroy(&children[1]);
BSON_APPEND_ARRAY_BEGIN(&children[0], "current", &children[1]);
for (int i = 0; i < (data->bms_hv.current_count); i++)
{
	BSON_APPEND_DOCUMENT_BEGIN(&children[1], "0", &children[2]);
	BSON_APPEND_INT64(&children[2], "timestamp", data->bms_hv.current[i].timestamp);
	BSON_APPEND_DOCUMENT_BEGIN(&children[2], "value", &children[3]);
	BSON_APPEND_DOUBLE(&children[3], "current", data->bms_hv.current[i].value.current);
	BSON_APPEND_DOUBLE(&children[3], "pow", data->bms_hv.current[i].value.pow);
	bson_append_document_end(&children[2], &children[3]);
	bson_destroy(&children[3]);
	bson_append_document_end(&children[1], &children[2]);
	bson_destroy(&children[2]);
}
bson_append_array_end(&children[0], &children[1]);
bson_destroy(&children[1]);
BSON_APPEND_ARRAY_BEGIN(&children[0], "errors", &children[1]);
for (int i = 0; i < (data->bms_hv.errors_count); i++)
{
	BSON_APPEND_DOCUMENT_BEGIN(&children[1], "0", &children[2]);
	BSON_APPEND_INT64(&children[2], "timestamp", data->bms_hv.errors[i].timestamp);
	BSON_APPEND_DOCUMENT_BEGIN(&children[2], "value", &children[3]);
	BSON_APPEND_INT32(&children[3], "fault_id", data->bms_hv.errors[i].value.fault_id);
	BSON_APPEND_INT32(&children[3], "fault_index", data->bms_hv.errors[i].value.fault_index);
	bson_append_document_end(&children[2], &children[3]);
	bson_destroy(&children[3]);
	bson_append_document_end(&children[1], &children[2]);
	bson_destroy(&children[2]);
}
bson_append_array_end(&children[0], &children[1]);
bson_destroy(&children[1]);
BSON_APPEND_ARRAY_BEGIN(&children[0], "warnings", &children[1]);
for (int i = 0; i < (data->bms_hv.warnings_count); i++)
{
	BSON_APPEND_DOCUMENT_BEGIN(&children[1], "0", &children[2]);
	BSON_APPEND_INT64(&children[2], "timestamp", data->bms_hv.warnings[i].timestamp);
	BSON_APPEND_DOCUMENT_BEGIN(&children[2], "value", &children[3]);
	BSON_APPEND_INT32(&children[3], "fault_id", data->bms_hv.warnings[i].value.fault_id);
	BSON_APPEND_INT32(&children[3], "fault_index", data->bms_hv.warnings[i].value.fault_index);
	bson_append_document_end(&children[2], &children[3]);
	bson_destroy(&children[3]);
	bson_append_document_end(&children[1], &children[2]);
	bson_destroy(&children[2]);
}
bson_append_array_end(&children[0], &children[1]);
bson_destroy(&children[1]);
bson_append_document_end(*bson_document, &children[0]);
bson_destroy(&children[0]);
BSON_APPEND_DOCUMENT_BEGIN(*bson_document, "bms_lv", &children[0]);
BSON_APPEND_ARRAY_BEGIN(&children[0], "values", &children[1]);
for (int i = 0; i < (data->bms_lv.values_count); i++)
{
	BSON_APPEND_DOCUMENT_BEGIN(&children[1], "0", &children[2]);
	BSON_APPEND_INT64(&children[2], "timestamp", data->bms_lv.values[i].timestamp);
	BSON_APPEND_DOCUMENT_BEGIN(&children[2], "value", &children[3]);
	BSON_APPEND_DOUBLE(&children[3], "voltage", data->bms_lv.values[i].value.voltage);
	BSON_APPEND_DOUBLE(&children[3], "temperature", data->bms_lv.values[i].value.temperature);
	bson_append_document_end(&children[2], &children[3]);
	bson_destroy(&children[3]);
	bson_append_document_end(&children[1], &children[2]);
	bson_destroy(&children[2]);
}
bson_append_array_end(&children[0], &children[1]);
bson_destroy(&children[1]);
BSON_APPEND_ARRAY_BEGIN(&children[0], "errors", &children[1]);
for (int i = 0; i < (data->bms_lv.errors_count); i++)
{
	BSON_APPEND_DOCUMENT_BEGIN(&children[1], "0", &children[2]);
	BSON_APPEND_INT64(&children[2], "timestamp", data->bms_lv.errors[i].timestamp);
	BSON_APPEND_INT32(&children[2], "value", data->bms_lv.errors[i].value);
	bson_append_document_end(&children[1], &children[2]);
	bson_destroy(&children[2]);
}
bson_append_array_end(&children[0], &children[1]);
bson_destroy(&children[1]);
bson_append_document_end(*bson_document, &children[0]);
bson_destroy(&children[0]);
BSON_APPEND_DOCUMENT_BEGIN(*bson_document, "gps", &children[0]);
BSON_APPEND_ARRAY_BEGIN(&children[0], "new", &children[1]);
for (int i = 0; i < (data->gps.new_count); i++)
{
	BSON_APPEND_DOCUMENT_BEGIN(&children[1], "0", &children[2]);
	BSON_APPEND_INT64(&children[2], "timestamp", data->gps.new[i].timestamp);
	BSON_APPEND_DOCUMENT_BEGIN(&children[2], "value", &children[3]);
	BSON_APPEND_DOUBLE(&children[3], "latitude_GGA_safe", data->gps.new[i].value.latitude_GGA_safe);
	BSON_APPEND_DOUBLE(&children[3], "longitude_GGA_safe", data->gps.new[i].value.longitude_GGA_safe);
	BSON_APPEND_DOUBLE(&children[3], "latitude_GGA", data->gps.new[i].value.latitude_GGA);
	BSON_APPEND_DOUBLE(&children[3], "longitude_GGA", data->gps.new[i].value.longitude_GGA);
	BSON_APPEND_DOUBLE(&children[3], "altitude_GGA", data->gps.new[i].value.altitude_GGA);
	BSON_APPEND_UTF8(&children[3], "ns_indicator_GGA", data->gps.new[i].value.ns_indicator_GGA);
	BSON_APPEND_UTF8(&children[3], "ew_indicator_GGA", data->gps.new[i].value.ew_indicator_GGA);
	BSON_APPEND_UTF8(&children[3], "utc_time_GGA", data->gps.new[i].value.utc_time_GGA);
	BSON_APPEND_DOUBLE(&children[3], "latitude_GLL", data->gps.new[i].value.latitude_GLL);
	BSON_APPEND_DOUBLE(&children[3], "longitude_GLL", data->gps.new[i].value.longitude_GLL);
	BSON_APPEND_UTF8(&children[3], "ns_indicator_GLL", data->gps.new[i].value.ns_indicator_GLL);
	BSON_APPEND_UTF8(&children[3], "ew_indicator_GLL", data->gps.new[i].value.ew_indicator_GLL);
	BSON_APPEND_UTF8(&children[3], "utc_time_GLL", data->gps.new[i].value.utc_time_GLL);
	BSON_APPEND_DOUBLE(&children[3], "ground_speed_knots_VTG", data->gps.new[i].value.ground_speed_knots_VTG);
	BSON_APPEND_DOUBLE(&children[3], "ground_speed_human_VTG", data->gps.new[i].value.ground_speed_human_VTG);
	BSON_APPEND_DOUBLE(&children[3], "latitude_RMC", data->gps.new[i].value.latitude_RMC);
	BSON_APPEND_DOUBLE(&children[3], "longitude_RMC", data->gps.new[i].value.longitude_RMC);
	BSON_APPEND_UTF8(&children[3], "ns_indicator_RMC", data->gps.new[i].value.ns_indicator_RMC);
	BSON_APPEND_UTF8(&children[3], "ew_indicator_RMC", data->gps.new[i].value.ew_indicator_RMC);
	BSON_APPEND_UTF8(&children[3], "utc_time_RMC", data->gps.new[i].value.utc_time_RMC);
	BSON_APPEND_UTF8(&children[3], "date_RMC", data->gps.new[i].value.date_RMC);
	BSON_APPEND_DOUBLE(&children[3], "ground_speed_knots_RMC", data->gps.new[i].value.ground_speed_knots_RMC);
	bson_append_document_end(&children[2], &children[3]);
	bson_destroy(&children[3]);
	bson_append_document_end(&children[1], &children[2]);
	bson_destroy(&children[2]);
}
bson_append_array_end(&children[0], &children[1]);
bson_destroy(&children[1]);
BSON_APPEND_DOCUMENT_BEGIN(&children[0], "old", &children[1]);
BSON_APPEND_ARRAY_BEGIN(&children[1], "location", &children[2]);
for (int i = 0; i < (data->gps.old.location_count); i++)
{
	BSON_APPEND_DOCUMENT_BEGIN(&children[2], "0", &children[3]);
	BSON_APPEND_INT64(&children[3], "timestamp", data->gps.old.location[i].timestamp);
	BSON_APPEND_DOCUMENT_BEGIN(&children[3], "value", &children[4]);
	BSON_APPEND_DOUBLE(&children[4], "latitude_m", data->gps.old.location[i].value.latitude_m);
	BSON_APPEND_INT32(&children[4], "latitude_o", data->gps.old.location[i].value.latitude_o);
	BSON_APPEND_DOUBLE(&children[4], "longitude_m", data->gps.old.location[i].value.longitude_m);
	BSON_APPEND_INT32(&children[4], "longitude_o", data->gps.old.location[i].value.longitude_o);
	BSON_APPEND_DOUBLE(&children[4], "speed", data->gps.old.location[i].value.speed);
	BSON_APPEND_DOUBLE(&children[4], "altitude", data->gps.old.location[i].value.altitude);
	bson_append_document_end(&children[3], &children[4]);
	bson_destroy(&children[4]);
	bson_append_document_end(&children[2], &children[3]);
	bson_destroy(&children[3]);
}
bson_append_array_end(&children[1], &children[2]);
bson_destroy(&children[2]);
BSON_APPEND_ARRAY_BEGIN(&children[1], "time", &children[2]);
for (int i = 0; i < (data->gps.old.time_count); i++)
{
	BSON_APPEND_DOCUMENT_BEGIN(&children[2], "0", &children[3]);
	BSON_APPEND_INT64(&children[3], "timestamp", data->gps.old.time[i].timestamp);
	BSON_APPEND_DOCUMENT_BEGIN(&children[3], "value", &children[4]);
	BSON_APPEND_INT32(&children[4], "hours", data->gps.old.time[i].value.hours);
	BSON_APPEND_INT32(&children[4], "minutes", data->gps.old.time[i].value.minutes);
	BSON_APPEND_INT32(&children[4], "seconds", data->gps.old.time[i].value.seconds);
	bson_append_document_end(&children[3], &children[4]);
	bson_destroy(&children[4]);
	bson_append_document_end(&children[2], &children[3]);
	bson_destroy(&children[3]);
}
bson_append_array_end(&children[1], &children[2]);
bson_destroy(&children[2]);
BSON_APPEND_ARRAY_BEGIN(&children[1], "true_track_mode", &children[2]);
for (int i = 0; i < (data->gps.old.true_track_mode_count); i++)
{
	BSON_APPEND_DOCUMENT_BEGIN(&children[2], "0", &children[3]);
	BSON_APPEND_INT64(&children[3], "timestamp", data->gps.old.true_track_mode[i].timestamp);
	BSON_APPEND_INT32(&children[3], "value", data->gps.old.true_track_mode[i].value);
	bson_append_document_end(&children[2], &children[3]);
	bson_destroy(&children[3]);
}
bson_append_array_end(&children[1], &children[2]);
bson_destroy(&children[2]);
bson_append_document_end(&children[0], &children[1]);
bson_destroy(&children[1]);
bson_append_document_end(*bson_document, &children[0]);
bson_destroy(&children[0]);
BSON_APPEND_ARRAY_BEGIN(*bson_document, "imu_gyro", &children[0]);
for (int i = 0; i < (data->imu_gyro_count); i++)
{
	BSON_APPEND_DOCUMENT_BEGIN(&children[0], "0", &children[1]);
	BSON_APPEND_INT64(&children[1], "timestamp", data->imu_gyro[i].timestamp);
	BSON_APPEND_DOCUMENT_BEGIN(&children[1], "value", &children[2]);
	BSON_APPEND_DOUBLE(&children[2], "x", data->imu_gyro[i].value.x);
	BSON_APPEND_DOUBLE(&children[2], "y", data->imu_gyro[i].value.y);
	BSON_APPEND_DOUBLE(&children[2], "z", data->imu_gyro[i].value.z);
	BSON_APPEND_DOUBLE(&children[2], "scale", data->imu_gyro[i].value.scale);
	bson_append_document_end(&children[1], &children[2]);
	bson_destroy(&children[2]);
	bson_append_document_end(&children[0], &children[1]);
	bson_destroy(&children[1]);
}
bson_append_array_end(*bson_document, &children[0]);
bson_destroy(&children[0]);
BSON_APPEND_ARRAY_BEGIN(*bson_document, "imu_accel", &children[0]);
for (int i = 0; i < (data->imu_accel_count); i++)
{
	BSON_APPEND_DOCUMENT_BEGIN(&children[0], "0", &children[1]);
	BSON_APPEND_INT64(&children[1], "timestamp", data->imu_accel[i].timestamp);
	BSON_APPEND_DOCUMENT_BEGIN(&children[1], "value", &children[2]);
	BSON_APPEND_DOUBLE(&children[2], "x", data->imu_accel[i].value.x);
	BSON_APPEND_DOUBLE(&children[2], "y", data->imu_accel[i].value.y);
	BSON_APPEND_DOUBLE(&children[2], "z", data->imu_accel[i].value.z);
	BSON_APPEND_DOUBLE(&children[2], "scale", data->imu_accel[i].value.scale);
	bson_append_document_end(&children[1], &children[2]);
	bson_destroy(&children[2]);
	bson_append_document_end(&children[0], &children[1]);
	bson_destroy(&children[1]);
}
bson_append_array_end(*bson_document, &children[0]);
bson_destroy(&children[0]);
BSON_APPEND_ARRAY_BEGIN(*bson_document, "front_wheels_encoder", &children[0]);
for (int i = 0; i < (data->front_wheels_encoder_count); i++)
{
	BSON_APPEND_DOCUMENT_BEGIN(&children[0], "0", &children[1]);
	BSON_APPEND_INT64(&children[1], "timestamp", data->front_wheels_encoder[i].timestamp);
	BSON_APPEND_DOCUMENT_BEGIN(&children[1], "value", &children[2]);
	BSON_APPEND_DOUBLE(&children[2], "speed", data->front_wheels_encoder[i].value.speed);
	BSON_APPEND_DOUBLE(&children[2], "speedms", data->front_wheels_encoder[i].value.speedms);
	bson_append_document_end(&children[1], &children[2]);
	bson_destroy(&children[2]);
	bson_append_document_end(&children[0], &children[1]);
	bson_destroy(&children[1]);
}
bson_append_array_end(*bson_document, &children[0]);
bson_destroy(&children[0]);
BSON_APPEND_ARRAY_BEGIN(*bson_document, "distance", &children[0]);
for (int i = 0; i < (data->distance_count); i++)
{
	BSON_APPEND_DOCUMENT_BEGIN(&children[0], "0", &children[1]);
	BSON_APPEND_INT64(&children[1], "timestamp", data->distance[i].timestamp);
	BSON_APPEND_DOCUMENT_BEGIN(&children[1], "value", &children[2]);
	BSON_APPEND_DOUBLE(&children[2], "meters", data->distance[i].value.meters);
	BSON_APPEND_DOUBLE(&children[2], "rotations", data->distance[i].value.rotations);
	BSON_APPEND_DOUBLE(&children[2], "angle", data->distance[i].value.angle);
	BSON_APPEND_DOUBLE(&children[2], "clock_period", data->distance[i].value.clock_period);
	bson_append_document_end(&children[1], &children[2]);
	bson_destroy(&children[2]);
	bson_append_document_end(&children[0], &children[1]);
	bson_destroy(&children[1]);
}
bson_append_array_end(*bson_document, &children[0]);
bson_destroy(&children[0]);
BSON_APPEND_ARRAY_BEGIN(*bson_document, "throttle", &children[0]);
for (int i = 0; i < (data->throttle_count); i++)
{
	BSON_APPEND_DOCUMENT_BEGIN(&children[0], "0", &children[1]);
	BSON_APPEND_INT64(&children[1], "timestamp", data->throttle[i].timestamp);
	BSON_APPEND_DOUBLE(&children[1], "value", data->throttle[i].value);
	bson_append_document_end(&children[0], &children[1]);
	bson_destroy(&children[1]);
}
bson_append_array_end(*bson_document, &children[0]);
bson_destroy(&children[0]);
BSON_APPEND_ARRAY_BEGIN(*bson_document, "brake", &children[0]);
for (int i = 0; i < (data->brake_count); i++)
{
	BSON_APPEND_DOCUMENT_BEGIN(&children[0], "0", &children[1]);
	BSON_APPEND_INT64(&children[1], "timestamp", data->brake[i].timestamp);
	BSON_APPEND_DOUBLE(&children[1], "value", data->brake[i].value);
	bson_append_document_end(&children[0], &children[1]);
	bson_destroy(&children[1]);
}
bson_append_array_end(*bson_document, &children[0]);
bson_destroy(&children[0]);
BSON_APPEND_DOCUMENT_BEGIN(*bson_document, "steering_wheel", &children[0]);
BSON_APPEND_ARRAY_BEGIN(&children[0], "encoder", &children[1]);
for (int i = 0; i < (data->steering_wheel.encoder_count); i++)
{
	BSON_APPEND_DOCUMENT_BEGIN(&children[1], "0", &children[2]);
	BSON_APPEND_INT64(&children[2], "timestamp", data->steering_wheel.encoder[i].timestamp);
	BSON_APPEND_DOUBLE(&children[2], "value", data->steering_wheel.encoder[i].value);
	bson_append_document_end(&children[1], &children[2]);
	bson_destroy(&children[2]);
}
bson_append_array_end(&children[0], &children[1]);
bson_destroy(&children[1]);
BSON_APPEND_ARRAY_BEGIN(&children[0], "gears", &children[1]);
for (int i = 0; i < (data->steering_wheel.gears_count); i++)
{
	BSON_APPEND_DOCUMENT_BEGIN(&children[1], "0", &children[2]);
	BSON_APPEND_INT64(&children[2], "timestamp", data->steering_wheel.gears[i].timestamp);
	BSON_APPEND_DOCUMENT_BEGIN(&children[2], "value", &children[3]);
	BSON_APPEND_INT32(&children[3], "control", data->steering_wheel.gears[i].value.control);
	BSON_APPEND_INT32(&children[3], "cooling", data->steering_wheel.gears[i].value.cooling);
	BSON_APPEND_INT32(&children[3], "map", data->steering_wheel.gears[i].value.map);
	bson_append_document_end(&children[2], &children[3]);
	bson_destroy(&children[3]);
	bson_append_document_end(&children[1], &children[2]);
	bson_destroy(&children[2]);
}
bson_append_array_end(&children[0], &children[1]);
bson_destroy(&children[1]);
BSON_APPEND_INT32(&children[0], "marker", data->steering_wheel.marker);
bson_append_document_end(*bson_document, &children[0]);
bson_destroy(&children[0]);


// -------------------

free(data->inverters.right.speed);
free(data->inverters.right.temperature_igbt);
free(data->inverters.right.temperature_motors);
free(data->inverters.left.speed);
free(data->inverters.left.temperature_igbt);
free(data->inverters.left.temperature_motors);
free(data->bms_hv.temperature);
free(data->bms_hv.voltage);
free(data->bms_hv.current);
free(data->bms_hv.errors);
free(data->bms_hv.warnings);
free(data->bms_lv.values);
free(data->bms_lv.errors);
free(data->gps.new);
free(data->gps.old.location);
free(data->gps.old.time);
free(data->gps.old.true_track_mode);
free(data->imu_gyro);
free(data->imu_accel);
free(data->front_wheels_encoder);
free(data->distance);
free(data->throttle);
free(data->brake);
free(data->steering_wheel.encoder);
free(data->steering_wheel.gears);
free(data);


// -------------------

typedef struct {
	long timestamp;
	int value;
} inverters_right_speed_data;

typedef struct {
	long timestamp;
	int value;
} inverters_right_temperature_igbt_data;

typedef struct {
	long timestamp;
	int value;
} inverters_right_temperature_motors_data;

typedef struct {
	inverters_right_speed_data *speed;
	int speed_count;
	int speed_size;
	inverters_right_temperature_igbt_data *temperature_igbt;
	int temperature_igbt_count;
	int temperature_igbt_size;
	inverters_right_temperature_motors_data *temperature_motors;
	int temperature_motors_count;
	int temperature_motors_size;
} inverters_right_data;

typedef struct {
	long timestamp;
	int value;
} inverters_left_speed_data;

typedef struct {
	long timestamp;
	int value;
} inverters_left_temperature_igbt_data;

typedef struct {
	long timestamp;
	int value;
} inverters_left_temperature_motors_data;

typedef struct {
	inverters_left_speed_data *speed;
	int speed_count;
	int speed_size;
	inverters_left_temperature_igbt_data *temperature_igbt;
	int temperature_igbt_count;
	int temperature_igbt_size;
	inverters_left_temperature_motors_data *temperature_motors;
	int temperature_motors_count;
	int temperature_motors_size;
} inverters_left_data;

typedef struct {
	inverters_right_data right;
	inverters_left_data left;
} inverters_data;

typedef struct {
	double max;
	double min;
	double average;
} bms_hv_temperature_value_data;

typedef struct {
	long timestamp;
	bms_hv_temperature_value_data value;
} bms_hv_temperature_data;

typedef struct {
	double max;
	double min;
	double total;
} bms_hv_voltage_value_data;

typedef struct {
	long timestamp;
	bms_hv_voltage_value_data value;
} bms_hv_voltage_data;

typedef struct {
	double current;
	double pow;
} bms_hv_current_value_data;

typedef struct {
	long timestamp;
	bms_hv_current_value_data value;
} bms_hv_current_data;

typedef struct {
	int fault_id;
	int fault_index;
} bms_hv_errors_value_data;

typedef struct {
	long timestamp;
	bms_hv_errors_value_data value;
} bms_hv_errors_data;

typedef struct {
	int fault_id;
	int fault_index;
} bms_hv_warnings_value_data;

typedef struct {
	long timestamp;
	bms_hv_warnings_value_data value;
} bms_hv_warnings_data;

typedef struct {
	bms_hv_temperature_data *temperature;
	int temperature_count;
	int temperature_size;
	bms_hv_voltage_data *voltage;
	int voltage_count;
	int voltage_size;
	bms_hv_current_data *current;
	int current_count;
	int current_size;
	bms_hv_errors_data *errors;
	int errors_count;
	int errors_size;
	bms_hv_warnings_data *warnings;
	int warnings_count;
	int warnings_size;
} bms_hv_data;

typedef struct {
	double voltage;
	double temperature;
} bms_lv_values_value_data;

typedef struct {
	long timestamp;
	bms_lv_values_value_data value;
} bms_lv_values_data;

typedef struct {
	long timestamp;
	int value;
} bms_lv_errors_data;

typedef struct {
	bms_lv_values_data *values;
	int values_count;
	int values_size;
	bms_lv_errors_data *errors;
	int errors_count;
	int errors_size;
} bms_lv_data;

typedef struct {
	double latitude_GGA_safe;
	double longitude_GGA_safe;
	double latitude_GGA;
	double longitude_GGA;
	double altitude_GGA;
	char* ns_indicator_GGA;
	char* ew_indicator_GGA;
	char* utc_time_GGA;
	double latitude_GLL;
	double longitude_GLL;
	char* ns_indicator_GLL;
	char* ew_indicator_GLL;
	char* utc_time_GLL;
	double ground_speed_knots_VTG;
	double ground_speed_human_VTG;
	double latitude_RMC;
	double longitude_RMC;
	char* ns_indicator_RMC;
	char* ew_indicator_RMC;
	char* utc_time_RMC;
	char* date_RMC;
	double ground_speed_knots_RMC;
} gps_new_value_data;

typedef struct {
	long timestamp;
	gps_new_value_data value;
} gps_new_data;

typedef struct {
	double latitude_m;
	int latitude_o;
	double longitude_m;
	int longitude_o;
	double speed;
	double altitude;
} gps_old_location_value_data;

typedef struct {
	long timestamp;
	gps_old_location_value_data value;
} gps_old_location_data;

typedef struct {
	int hours;
	int minutes;
	int seconds;
} gps_old_time_value_data;

typedef struct {
	long timestamp;
	gps_old_time_value_data value;
} gps_old_time_data;

typedef struct {
	long timestamp;
	int value;
} gps_old_true_track_mode_data;

typedef struct {
	gps_old_location_data *location;
	int location_count;
	int location_size;
	gps_old_time_data *time;
	int time_count;
	int time_size;
	gps_old_true_track_mode_data *true_track_mode;
	int true_track_mode_count;
	int true_track_mode_size;
} gps_old_data;

typedef struct {
	gps_new_data *new;
	int new_count;
	int new_size;
	gps_old_data old;
} gps_data;

typedef struct {
	double x;
	double y;
	double z;
	double scale;
} imu_gyro_value_data;

typedef struct {
	long timestamp;
	imu_gyro_value_data value;
} imu_gyro_data;

typedef struct {
	double x;
	double y;
	double z;
	double scale;
} imu_accel_value_data;

typedef struct {
	long timestamp;
	imu_accel_value_data value;
} imu_accel_data;

typedef struct {
	double speed;
	double speedms;
} front_wheels_encoder_value_data;

typedef struct {
	long timestamp;
	front_wheels_encoder_value_data value;
} front_wheels_encoder_data;

typedef struct {
	double meters;
	double rotations;
	double angle;
	double clock_period;
} distance_value_data;

typedef struct {
	long timestamp;
	distance_value_data value;
} distance_data;

typedef struct {
	long timestamp;
	double value;
} throttle_data;

typedef struct {
	long timestamp;
	double value;
} brake_data;

typedef struct {
	long timestamp;
	double value;
} steering_wheel_encoder_data;

typedef struct {
	int control;
	int cooling;
	int map;
} steering_wheel_gears_value_data;

typedef struct {
	long timestamp;
	steering_wheel_gears_value_data value;
} steering_wheel_gears_data;

typedef struct {
	steering_wheel_encoder_data *encoder;
	int encoder_count;
	int encoder_size;
	steering_wheel_gears_data *gears;
	int gears_count;
	int gears_size;
	int marker;
} steering_wheel_data;

typedef struct {
	int id;
	long timestamp;
	char* sessionName;
	inverters_data inverters;
	bms_hv_data bms_hv;
	bms_lv_data bms_lv;
	gps_data gps;
	imu_gyro_data *imu_gyro;
	int imu_gyro_count;
	int imu_gyro_size;
	imu_accel_data *imu_accel;
	int imu_accel_count;
	int imu_accel_size;
	front_wheels_encoder_data *front_wheels_encoder;
	int front_wheels_encoder_count;
	int front_wheels_encoder_size;
	distance_data *distance;
	int distance_count;
	int distance_size;
	throttle_data *throttle;
	int throttle_count;
	int throttle_size;
	brake_data *brake;
	int brake_count;
	int brake_size;
	steering_wheel_data steering_wheel;
} data_t;

