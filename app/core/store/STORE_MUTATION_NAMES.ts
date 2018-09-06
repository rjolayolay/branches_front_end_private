export enum MUTATION_NAMES {
	SET_CONTENT_USER = 'SET_CONTENT_USER',
	SET_CONTENT = 'SET_CONTENT',
	SET_TREE_USER = 'SET_TREE_USER',
	SET_TREE = 'SET_TREE',
	SET_TREE_LOCATION = 'SET_TREE_LOCATION',
	CREATE_USER_OR_LOGIN = 'create_user_or_login',
	LOGIN = 'login',
	INITIALIZE_SIGMA_INSTANCE_IF_NOT_INITIALIZED = 'initializeSigmaInstance',
	CREATE_PRIMARY_USER_MAP_IF_NOT_CREATED = 'CREATE_PRIMARY_USER_MAP_IF_NOT_CREATED',
	JUMP_TO = 'jump_to',
	REFRESH = 'refresh',
	REMOVE_NODE_UI = 'remove_node_ui',
	ADD_NODE = 'add_node',
	ADD_EDGES = 'add_edges',
	CREATE_CONTENT_USER_DATA = 'create_content_user_data',
	CREATE_CONTENT = 'create_content',
	EDIT_FACT = 'edit_fact',
	EDIT_CATEGORY = 'edit_category',
	CREATE_TREE_LOCATION = 'create_tree_location',
	REMOVE_TREE = 'remove_tree',
	MOVE_TREE_COORDINATE = 'move_tree_coordinate',
	MOVE_TREE_COORDINATE_AND_CHILDREN_BY_DELTA = 'MOVE_TREE_COORDINATE_BY_DELTA',
	CREATE_TREE = 'create_tree',
	ADD_CONTENT_INTERACTION = 'add_content_interaction',
	ADD_CONTENT_INTERACTION_IF_NO_CONTENT_USER_DATA = 'ADD_CONTENT_INTERACTION_IF_NO_CONTENT_USER_DATA',
	ADD_FIRST_CONTENT_INTERACTION = 'add_first_content_interaction',
	NEW_CHILD_TREE = 'new_child_tree',
	ADD_CHILD_TO_PARENT = ' add_child_to_parent',
	ADD_PARENT_EDGE_NO_REFRESH = 'add_parent_edge_no_refresh',
	SET_USER_DATA = 'set_user_data',
	SET_USER_ID = 'set_user_id',
	SET_BRANCHES_MAP_DATA = 'set_branches_map_data',
	SET_MEMBERSHIP_EXPIRATION_DATE = 'set_membership_expiration_date',
	LOGIN_WITH_FACEBOOK = 'login_with_facebook',
	SET_TREE_DATA = 'set_tree_data',
	SET_TREE_LOCATION_DATA = 'set_tree_location_data',
	SET_TREE_USER_DATA = 'set_tree_user_data',
	SET_CONTENT_DATA = 'set_content_data',
	SET_CONTENT_USER_DATA = 'set_content_user_data',
	ADD_USER_POINTS = 'add_user_points',
	CREATE_MAP = 'create_map',
	CREATE_MAP_AND_ROOT_TREE_ID = 'create_map_and_root_tree_id',
	CREATE_USER_PRIMARY_MAP = 'create_user_primary_map',
	LOAD_MAP_IF_NOT_LOADED = 'load_map_if_not_loaded',
	LOAD_MAP_AND_ROOT_SIGMA_NODE = 'load_map_and_root_sigma_node',
	PAUSE = 'PAUSE',
	SET_MAP_ID = 'set_map_id',
	SAVE_USER_INFO_FROM_LOGIN_PROVIDER = 'save_user_info_from_login_provider',
	SWITCH_TO_MAP = 'switch_to_map',
	SWITCH_TO_LAST_USED_MAP = 'SWITCH_TO_LAST_USED_MAP',
	SWITCH_TO_GLOBAL_MAP = 'SWITCH_TO_GLOBAL_MAP',
	SWITCH_TO_PERSONAL_MAP = 'SWITCH_TO_PERSONAL_MAP',
	PLAY_TREE = 'PLAY_TREE',
	JUMP_TO_AND_HIGHLIGHT_NEXT_FLASHCARD_TO_STUDY = 'JUMP_TO_AND_HIGHLIGHT_NEXT_FLASHCARD_TO_STUDY',
	JUMP_TO_NEXT_FLASHCARD_IF_IN_PLAYING_MODE = 'JUMP_TO_NEXT_FLASHCARD_IF_IN_PLAYING_MODE',
	REHEAPIFY_STUDY_HEAP_AND_PAUSE_IF_NO_MORE_OVERDUE = 'REHEAPIFY_STUDY_HEAP_AND_PAUSE_IF_NO_MORE_OVERDUE',
	CLOSE_CURRENT_FLASHCARD = 'CLOSE_CURRENT_FLASHCARD',
	HIGHLIGHT_FLASHCARD_NODE = 'HIGHLIGHT_FLASHCARD_NODE',
	UNHIGHLIGHT_PREVIOUSLY_HIGHLIGHTED_NODE = 'UNHIGHLIGHT_PREVIOUSLY_HIGHLIGHTED_NODE'
}
