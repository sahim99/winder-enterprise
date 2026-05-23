# am_portfolio_client.api.PortfolioManagementApi

## Load the API package
```dart
import 'package:am_portfolio_client/api.dart';
```

All URIs are relative to *http://localhost:8101*

Method | HTTP request | Description
------------- | ------------- | -------------
[**getPortfolioBasicDetails**](PortfolioManagementApi.md#getportfoliobasicdetails) | **GET** /api/v1/portfolios/list | Get portfolio IDs and names
[**getPortfolioById**](PortfolioManagementApi.md#getportfoliobyid) | **GET** /api/v1/portfolios/{portfolioId} | Get portfolio by ID
[**getPortfolioHoldings**](PortfolioManagementApi.md#getportfolioholdings) | **GET** /api/v1/portfolios/holdings | Get portfolio holdings
[**getPortfolioSummary**](PortfolioManagementApi.md#getportfoliosummary) | **GET** /api/v1/portfolios/summary | Get portfolio summary
[**getPortfolios**](PortfolioManagementApi.md#getportfolios) | **GET** /api/v1/portfolios | Get all portfolios for user


# **getPortfolioBasicDetails**
> List<PortfolioBasicInfo> getPortfolioBasicDetails(userId)

Get portfolio IDs and names

Retrieves a lightweight list of portfolio IDs and names for all user portfolios

### Example
```dart
import 'package:am_portfolio_client/api.dart';

final api_instance = PortfolioManagementApi();
final userId = userId_example; // String | User ID to fetch portfolio basic details for

try {
    final result = api_instance.getPortfolioBasicDetails(userId);
    print(result);
} catch (e) {
    print('Exception when calling PortfolioManagementApi->getPortfolioBasicDetails: $e\n');
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **userId** | **String**| User ID to fetch portfolio basic details for | 

### Return type

[**List<PortfolioBasicInfo>**](PortfolioBasicInfo.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: */*

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **getPortfolioById**
> PortfolioModelV1 getPortfolioById(portfolioId)

Get portfolio by ID

Retrieves detailed portfolio information for a specific portfolio ID

### Example
```dart
import 'package:am_portfolio_client/api.dart';

final api_instance = PortfolioManagementApi();
final portfolioId = portfolioId_example; // String | Portfolio ID (UUID format)

try {
    final result = api_instance.getPortfolioById(portfolioId);
    print(result);
} catch (e) {
    print('Exception when calling PortfolioManagementApi->getPortfolioById: $e\n');
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **portfolioId** | **String**| Portfolio ID (UUID format) | 

### Return type

[**PortfolioModelV1**](PortfolioModelV1.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: */*, application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **getPortfolioHoldings**
> PortfolioHoldings getPortfolioHoldings(userId, portfolioId, page, size, interval)

Get portfolio holdings

Retrieves all holdings across portfolios for a user with current values. Optionally filter by specific portfolio ID.

### Example
```dart
import 'package:am_portfolio_client/api.dart';

final api_instance = PortfolioManagementApi();
final userId = userId_example; // String | User ID to fetch portfolio holdings for
final portfolioId = portfolioId_example; // String | Optional portfolio ID to filter results for specific portfolio
final page = 56; // int | 
final size = 56; // int | 
final interval = interval_example; // String | 

try {
    final result = api_instance.getPortfolioHoldings(userId, portfolioId, page, size, interval);
    print(result);
} catch (e) {
    print('Exception when calling PortfolioManagementApi->getPortfolioHoldings: $e\n');
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **userId** | **String**| User ID to fetch portfolio holdings for | 
 **portfolioId** | **String**| Optional portfolio ID to filter results for specific portfolio | [optional] 
 **page** | **int**|  | [optional] 
 **size** | **int**|  | [optional] 
 **interval** | **String**|  | [optional] 

### Return type

[**PortfolioHoldings**](PortfolioHoldings.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: */*

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **getPortfolioSummary**
> PortfolioSummaryV1 getPortfolioSummary(userId, portfolioId, page, size, interval)

Get portfolio summary

Retrieves a summary of all portfolios for a user with performance metrics. Optionally filter by specific portfolio ID.

### Example
```dart
import 'package:am_portfolio_client/api.dart';

final api_instance = PortfolioManagementApi();
final userId = userId_example; // String | User ID to fetch portfolio summary for
final portfolioId = portfolioId_example; // String | Optional portfolio ID to filter results for specific portfolio
final page = 56; // int | 
final size = 56; // int | 
final interval = interval_example; // String | 

try {
    final result = api_instance.getPortfolioSummary(userId, portfolioId, page, size, interval);
    print(result);
} catch (e) {
    print('Exception when calling PortfolioManagementApi->getPortfolioSummary: $e\n');
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **userId** | **String**| User ID to fetch portfolio summary for | 
 **portfolioId** | **String**| Optional portfolio ID to filter results for specific portfolio | [optional] 
 **page** | **int**|  | [optional] 
 **size** | **int**|  | [optional] 
 **interval** | **String**|  | [optional] 

### Return type

[**PortfolioSummaryV1**](PortfolioSummaryV1.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: */*

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **getPortfolios**
> List<PortfolioModelV1> getPortfolios(userId)

Get all portfolios for user

Retrieves all portfolios associated with a specific user ID

### Example
```dart
import 'package:am_portfolio_client/api.dart';

final api_instance = PortfolioManagementApi();
final userId = userId_example; // String | User ID to fetch portfolios for

try {
    final result = api_instance.getPortfolios(userId);
    print(result);
} catch (e) {
    print('Exception when calling PortfolioManagementApi->getPortfolios: $e\n');
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **userId** | **String**| User ID to fetch portfolios for | 

### Return type

[**List<PortfolioModelV1>**](PortfolioModelV1.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: */*

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

