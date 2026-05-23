# am_portfolio_client.api.MarketIndicesApi

## Load the API package
```dart
import 'package:am_portfolio_client/api.dart';
```

All URIs are relative to *http://localhost:8101*

Method | HTTP request | Description
------------- | ------------- | -------------
[**getAllMarketIndices**](MarketIndicesApi.md#getallmarketindices) | **GET** /api/v1/market-index/all | Get all market indices


# **getAllMarketIndices**
> IndexIndices getAllMarketIndices(interval, type)

Get all market indices

Retrieves all market indices with optional filtering by interval and type

### Example
```dart
import 'package:am_portfolio_client/api.dart';

final api_instance = MarketIndicesApi();
final interval = interval_example; // String | 
final type = type_example; // String | 

try {
    final result = api_instance.getAllMarketIndices(interval, type);
    print(result);
} catch (e) {
    print('Exception when calling MarketIndicesApi->getAllMarketIndices: $e\n');
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **interval** | **String**|  | [optional] 
 **type** | **String**|  | [optional] 

### Return type

[**IndexIndices**](IndexIndices.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json, */*

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

