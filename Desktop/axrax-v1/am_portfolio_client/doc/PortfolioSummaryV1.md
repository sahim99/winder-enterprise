# am_portfolio_client.model.PortfolioSummaryV1

## Load the model package
```dart
import 'package:am_portfolio_client/api.dart';
```

## Properties
Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**investmentValue** | **double** |  | [optional] 
**currentValue** | **double** |  | [optional] 
**totalGainLoss** | **double** |  | [optional] 
**totalGainLossPercentage** | **double** |  | [optional] 
**todayGainLoss** | **double** |  | [optional] 
**todayGainLossPercentage** | **double** |  | [optional] 
**totalAssets** | **int** |  | [optional] 
**gainersCount** | **int** |  | [optional] 
**losersCount** | **int** |  | [optional] 
**todayGainersCount** | **int** |  | [optional] 
**todayLosersCount** | **int** |  | [optional] 
**lastUpdated** | [**DateTime**](DateTime.md) |  | [optional] 
**brokerPortfolios** | [**Map<String, BrokerPortfolioSummary>**](BrokerPortfolioSummary.md) |  | [optional] [default to const {}]
**marketCapHoldings** | [**Map<String, List<EquityHoldings>>**](List.md) |  | [optional] [default to const {}]
**sectorialHoldings** | [**Map<String, List<EquityHoldings>>**](List.md) |  | [optional] [default to const {}]

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


