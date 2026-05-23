//
// AUTO-GENERATED FILE, DO NOT MODIFY!
//
// @dart=2.12

// ignore_for_file: unused_element, unused_import
// ignore_for_file: always_put_required_named_parameters_first
// ignore_for_file: constant_identifier_names
// ignore_for_file: lines_longer_than_80_chars

library openapi.api;

import 'dart:async';
import 'dart:convert';
import 'dart:io';

import 'package:collection/collection.dart';
import 'package:http/http.dart';
import 'package:intl/intl.dart';
import 'package:meta/meta.dart';

part 'api_client.dart';
part 'api_helper.dart';
part 'api_exception.dart';
part 'auth/authentication.dart';
part 'auth/api_key_auth.dart';
part 'auth/oauth.dart';
part 'auth/http_basic_auth.dart';
part 'auth/http_bearer_auth.dart';

part 'api/index_analytics_api.dart';
part 'api/market_indices_api.dart';
part 'api/portfolio_analytics_api.dart';
part 'api/portfolio_management_api.dart';

part 'model/advanced_analytics_request.dart';
part 'model/advanced_analytics_response.dart';
part 'model/analytics_component.dart';
part 'model/broker_portfolio_summary.dart';
part 'model/cap_segment.dart';
part 'model/chart_paths.dart';
part 'model/core_identifiers.dart';
part 'model/equity_broker_holding.dart';
part 'model/equity_holdings.dart';
part 'model/equity_model.dart';
part 'model/feature_configuration.dart';
part 'model/feature_toggles.dart';
part 'model/fundamental_ratios.dart';
part 'model/gainer_loser.dart';
part 'model/heatmap.dart';
part 'model/historical_comparison.dart';
part 'model/index_indices.dart';
part 'model/industry_weight.dart';
part 'model/market_breadth.dart';
part 'model/market_cap_allocation.dart';
part 'model/market_data.dart';
part 'model/market_data_model.dart';
part 'model/market_index_indices.dart';
part 'model/ohlcv_model.dart';
part 'model/pagination_request.dart';
part 'model/performance_metrics.dart';
part 'model/portfolio_basic_info.dart';
part 'model/portfolio_holdings.dart';
part 'model/portfolio_model_v1.dart';
part 'model/portfolio_summary_v1.dart';
part 'model/sector_allocation.dart';
part 'model/sector_movement.dart';
part 'model/sector_performance.dart';
part 'model/sector_weight.dart';
part 'model/stock_detail.dart';
part 'model/stock_movement.dart';
part 'model/time_frame_request.dart';
part 'model/time_series_data_model.dart';


/// An [ApiClient] instance that uses the default values obtained from
/// the OpenAPI specification file.
var defaultApiClient = ApiClient();

const _delimiters = {'csv': ',', 'ssv': ' ', 'tsv': '\t', 'pipes': '|'};
const _dateEpochMarker = 'epoch';
const _deepEquality = DeepCollectionEquality();
final _dateFormatter = DateFormat('yyyy-MM-dd');
final _regList = RegExp(r'^List<(.*)>$');
final _regSet = RegExp(r'^Set<(.*)>$');
final _regMap = RegExp(r'^Map<String,(.*)>$');

bool _isEpochMarker(String? pattern) => pattern == _dateEpochMarker || pattern == '/$_dateEpochMarker/';
