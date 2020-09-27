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
